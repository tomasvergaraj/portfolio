import { useEffect, useRef } from 'react';
import { cancelIdle, createProgram, parseRgb, scheduleIdle } from '../lib/webgl';

/**
 * Capa de grano de papel: una textura monocroma horneada en un solo frame de
 * WebGL crudo (sin dependencias). No anima nunca —se redibuja solo al montar,
 * al cambiar de tamaño y al alternar tema— así que no consume batería ni compite
 * con el LCP. El color del grano se lee de la custom property `--grain-rgb`
 * (oscura en claro, clara en oscuro), que cambia instantáneo al togglear tema.
 * Sin soporte WebGL el canvas queda transparente: degrada a invisible.
 */

const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform vec3 uColor;
uniform float uIntensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  float n1 = hash(gl_FragCoord.xy);
  float n2 = hash(gl_FragCoord.xy * 0.5 + 17.0);
  float a = mix(n1, n2, 0.5) * uIntensity;
  gl_FragColor = vec4(uColor, a);
}
`;

interface PaperGrainProps {
  /** Escala de opacidad del grano (0–1). Subir con cuidado: de más se ve "sucio". */
  intensity?: number;
}

const PaperGrain = ({ intensity = 0.08 }: PaperGrainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let disposed = false;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let colorLoc: WebGLUniformLocation | null = null;
    let intensityLoc: WebGLUniformLocation | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let themeObserver: MutationObserver | null = null;
    let rafId = 0;

    const render = () => {
      if (disposed || !gl || !program) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const grain = getComputedStyle(document.documentElement).getPropertyValue('--grain-rgb');
      const [r, g, b] = parseRgb(grain, [0.08, 0.11, 0.16]);

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.uniform3f(colorLoc, r, g, b);
      gl.uniform1f(intensityLoc, intensity);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const scheduleRender = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };

    const init = () => {
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
      if (!gl) return; // sin WebGL el canvas queda transparente

      program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
      if (!program) return;

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      colorLoc = gl.getUniformLocation(program, 'uColor');
      intensityLoc = gl.getUniformLocation(program, 'uIntensity');

      resizeObserver = new ResizeObserver(scheduleRender);
      resizeObserver.observe(canvas);

      themeObserver = new MutationObserver(scheduleRender);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      render();
    };

    const idleHandle = scheduleIdle(init); // diferir hasta después del primer pintado

    return () => {
      disposed = true;
      cancelIdle(idleHandle);
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      themeObserver?.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none select-none"
    />
  );
};

export default PaperGrain;
