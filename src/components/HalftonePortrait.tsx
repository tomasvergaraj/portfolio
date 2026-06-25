import { useEffect, useRef } from 'react';
import { cancelIdle, createProgram, parseRgb, scheduleIdle } from '../lib/webgl';

/**
 * Superpone una trama de imprenta (halftone) de puntos de tinta SOBRE la foto, en
 * WebGL crudo (sin dependencias). El canvas es transparente: solo dibuja los puntos,
 * así que la <img grayscale> siempre se ve debajo —el efecto NO tapa la foto, la viste
 * de acabado de impresión—. Al montar, los puntos se "entintan" una vez en ~700ms y
 * quedan estáticos: sin loop perpetuo ni gesto reactivo al cursor. La tinta sale de una
 * custom property por tema (no invierte: recolorea). Si WebGL falla, queda solo la foto.
 * Solo inicializa en >=lg (su contenedor es desktop-only): coste cero en móvil.
 */

const INK_IN_MS = 700;
const ANGLE = Math.PI / 4; // 45°: lattice clásico de screen-print monocromo
const CONTRAST = 1.2;
const DESKTOP_QUERY = '(min-width: 1024px)';

const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uResolution;
uniform vec2 uImageSize;
uniform vec3 uInk;
uniform float uDensity;
uniform float uProgress;
uniform float uContrast;
uniform float uAngle;
uniform float uStrength;

float luma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

// Mapea uv de canvas a uv de imagen replicando object-fit: cover.
vec2 coverUV(vec2 uv) {
  float ca = uResolution.x / uResolution.y;
  float ia = uImageSize.x / uImageSize.y;
  if (ca > ia) {
    float s = ia / ca;
    return vec2(uv.x, (uv.y - 0.5) * s + 0.5);
  }
  float s = ca / ia;
  return vec2((uv.x - 0.5) * s + 0.5, uv.y);
}

void main() {
  float ca = uResolution.x / uResolution.y;
  // Coordenadas isótropas centradas (alto = 1 unidad) para celdas cuadradas.
  vec2 p = vec2((vUv.x - 0.5) * ca, vUv.y - 0.5);
  float c = cos(uAngle);
  float s = sin(uAngle);
  vec2 pr = mat2(c, -s, s, c) * p;

  vec2 cellId = floor(pr * uDensity);
  float dist = length(fract(pr * uDensity) - 0.5);

  // Luminancia muestreada en el centro de la celda (rota de vuelta a la imagen).
  vec2 pCenter = (cellId + 0.5) / uDensity;
  vec2 pa = mat2(c, s, -s, c) * pCenter;
  vec2 uvCenter = vec2(pa.x / ca, pa.y) + 0.5;
  float lum = luma(texture2D(uTex, clamp(coverUV(uvCenter), 0.0, 1.0)).rgb);

  float ink = clamp((1.0 - lum - 0.5) * uContrast + 0.5, 0.0, 1.0);
  float radius = sqrt(ink) * 0.5 * uProgress; // área ∝ tinta; crece con el entintado
  float edge = 1.0 / max(uResolution.y / uDensity, 1.0); // AA ~1px sin derivadas
  float coverage = 1.0 - smoothstep(radius - edge, radius + edge, dist);

  // Solo los puntos, con alpha: la foto de abajo se ve entre ellos.
  gl_FragColor = vec4(uInk, coverage * uStrength);
}
`;

interface HalftonePortraitProps {
  src: string;
  alt: string;
  /** Puntos verticales de la trama. Más alto = más fino (rostro más legible). */
  density?: number;
  /** Opacidad de los puntos sobre la foto (0–1). Más bajo = foto más visible. */
  strength?: number;
}

const HalftonePortrait = ({ src, alt, density = 92, strength = 0.85 }: HalftonePortraitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let disposed = false;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let texture: WebGLTexture | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let themeObserver: MutationObserver | null = null;
    let rafId = 0;
    let imageW = 1;
    let imageH = 1;
    let progress = 0;

    const uniforms: Record<string, WebGLUniformLocation | null> = {};

    const render = () => {
      if (disposed || !gl || !program) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const styles = getComputedStyle(document.documentElement);
      const ink = parseRgb(styles.getPropertyValue('--halftone-ink-rgb'), [0.12, 0.16, 0.23]);

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.uniform2f(uniforms.resolution, width, height);
      gl.uniform2f(uniforms.imageSize, imageW, imageH);
      gl.uniform3f(uniforms.ink, ink[0], ink[1], ink[2]);
      gl.uniform1f(uniforms.density, density);
      gl.uniform1f(uniforms.progress, progress);
      gl.uniform1f(uniforms.contrast, CONTRAST);
      gl.uniform1f(uniforms.angle, ANGLE);
      gl.uniform1f(uniforms.strength, strength);
      gl.uniform1i(uniforms.tex, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Redibujo puntual (resize / cambio de tema): conserva el progreso actual.
    const scheduleRender = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };

    // Animación de entintado: corre una sola vez y se detiene (sin loop perpetuo).
    let startTime = 0;
    const animateInk = (now: number) => {
      if (disposed) return;
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / INK_IN_MS);
      progress = 1 - Math.pow(1 - t, 3); // easeOutCubic
      render();
      if (t < 1) rafId = requestAnimationFrame(animateInk);
    };

    const init = (image: HTMLImageElement) => {
      if (disposed) return;

      const options: WebGLContextAttributes = {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
        depth: false,
        stencil: false,
      };
      gl =
        (canvas.getContext('webgl', options) as WebGLRenderingContext | null) ||
        (canvas.getContext('experimental-webgl', options) as WebGLRenderingContext | null);
      if (!gl) return; // sin WebGL queda solo la <img>

      program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
      if (!program) return;

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // puntos sobre la foto

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      ['resolution', 'imageSize', 'ink', 'density', 'progress', 'contrast', 'angle', 'strength', 'tex'].forEach(
        (name) => {
          const u = 'u' + name.charAt(0).toUpperCase() + name.slice(1);
          uniforms[name] = gl!.getUniformLocation(program!, u);
        },
      );

      imageW = image.naturalWidth || 1;
      imageH = image.naturalHeight || 1;
      texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      resizeObserver = new ResizeObserver(scheduleRender);
      resizeObserver.observe(canvas);
      themeObserver = new MutationObserver(scheduleRender);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      canvas.style.opacity = '1'; // revela la capa de puntos solo on-success de gl
      rafId = requestAnimationFrame(animateInk);
    };

    const startup = () => {
      if (disposed || gl) return;
      const image = new Image();
      image.onload = () => {
        if (!disposed) init(image);
      };
      image.src = src; // ya cacheada por la <img loading="eager">: sin bytes extra
    };

    // Solo arranca en desktop (su contenedor es hidden lg:block): cero coste en móvil.
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onMedia = () => {
      if (mql.matches) scheduleIdle(startup);
    };
    mql.addEventListener('change', onMedia);

    const idleHandle = scheduleIdle(() => {
      if (mql.matches) startup();
    });

    return () => {
      disposed = true;
      cancelIdle(idleHandle);
      cancelAnimationFrame(rafId);
      mql.removeEventListener('change', onMedia);
      resizeObserver?.disconnect();
      themeObserver?.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
        gl.deleteTexture(texture);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }, [src, density, strength]);

  return (
    <>
      <img src={src} alt={alt} className="h-full w-full object-cover grayscale" loading="eager" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500"
      />
    </>
  );
};

export default HalftonePortrait;
