// Helpers compartidos por los efectos WebGL del hero (PaperGrain, HalftonePortrait).
// Mantienen los componentes sin dependencias externas y sin duplicar bootstrap.

type IdleHandle = number;

/** Difiere trabajo hasta después del primer pintado, sin bloquear el LCP. */
export const scheduleIdle = (cb: () => void): IdleHandle => {
  const w = window as typeof window & { requestIdleCallback?: (cb: () => void) => number };
  return typeof w.requestIdleCallback === 'function' ? w.requestIdleCallback(cb) : window.setTimeout(cb, 1);
};

export const cancelIdle = (handle: IdleHandle) => {
  const w = window as typeof window & { cancelIdleCallback?: (handle: number) => void };
  if (typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(handle);
  else window.clearTimeout(handle);
};

/** Parsea "20 28 40" (o "rgb(20, 28, 40)") a [r, g, b] normalizado 0–1. */
export const parseRgb = (
  value: string,
  fallback: [number, number, number] = [0, 0, 0],
): [number, number, number] => {
  const match = value.match(/(\d+(?:\.\d+)?)/g);
  if (!match || match.length < 3) return fallback;
  return [Number(match[0]) / 255, Number(match[1]) / 255, Number(match[2]) / 255];
};

export const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

/** Crea y linkea un programa a partir de fuentes de vértice y fragmento. */
export const createProgram = (
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram | null => {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
};
