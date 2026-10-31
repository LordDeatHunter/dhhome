<script lang="ts">
  import { onMount } from 'svelte';

  const VERTEX = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const FRAGMENT = `
    precision highp float;
    uniform vec2 uRes;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uStrength;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = p * 2.02 + vec2(17.3, 9.1);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      float s = min(uRes.x, uRes.y);
      vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / s;
      vec2 m = (uMouse * uRes - 0.5 * uRes) / s;
      vec2 d = p - m;
      float r = length(d);

      // the cursor pushes the fluid outwards and swirls it
      float inf = exp(-r * r * 7.0) * uStrength;
      vec2 dir = d / (r + 0.0001);
      vec2 q = p + dir * inf * 0.05 + vec2(-dir.y, dir.x) * inf * 0.03;

      float t = uTime * 0.12;
      vec2 w = vec2(fbm(q * 1.6 + vec2(0.0, t)), fbm(q * 1.6 + vec2(5.2, 1.3) - t));
      float f = fbm(q * 1.3 + 2.2 * w + t * 0.5);

      vec3 deep = vec3(0.29, 0.05, 0.21);
      vec3 mid = vec3(0.74, 0.055, 0.2);
      vec3 hot = vec3(0.95, 0.32, 0.45);

      vec3 col = mix(deep, mid, smoothstep(0.2, 0.6, f));
      col = mix(col, hot, smoothstep(0.55, 0.95, f) * 0.8);

      // bright ridges where the warped noise folds
      float ridge = pow(1.0 - abs(2.0 * f - 1.0), 6.0);
      col += vec3(0.5, 0.08, 0.14) * ridge * 0.35;

      // keep the centre bright (the text lives there), fall off to dark edges
      float len = length(p * vec2(0.8, 1.0));
      col = mix(col, hot, smoothstep(0.75, 0.0, len) * 0.45);
      col = mix(deep * 0.55, col, smoothstep(1.35, 0.25, len));

      // cursor glow
      col += vec3(0.95, 0.2, 0.3) * exp(-r * r * 12.0) * 0.1 * uStrength;

      // dither to avoid banding
      col += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const RENDER_SCALE = 0.6;
  const MAX_DPR = 1.5;

  let canvas = $state<HTMLCanvasElement>();
  let ready = $state(false);

  onMount(() => {
    if (!canvas) {
      return;
    }
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) {
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) {
      return;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uStrength = gl.getUniformLocation(program, 'uStrength');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // pointer in 0..1 (y up), eased towards the target so the fluid feels viscous
    const target = { x: 0.5, y: 0.5, strength: 0 };
    const current = { x: 0.5, y: 0.5, strength: 0 };

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
      target.strength = 1;
    };
    const onPointerLeave = () => {
      target.strength = 0;
    };

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, MAX_DPR) * RENDER_SCALE;
      canvas!.width = Math.max(1, Math.floor(canvas!.clientWidth * scale));
      canvas!.height = Math.max(1, Math.floor(canvas!.clientHeight * scale));
      gl.viewport(0, 0, canvas!.width, canvas!.height);
    };

    let frame = 0;
    let last = performance.now();
    let time = 12;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      time += dt;

      const k = 1 - Math.exp(-dt * 4);
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      current.strength += (target.strength - current.strength) * (1 - Math.exp(-dt * 2.5));

      gl.uniform2f(uRes, canvas!.width, canvas!.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, current.x, current.y);
      gl.uniform1f(uStrength, current.strength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion) {
        frame = requestAnimationFrame(draw);
      }
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) {
        draw(performance.now());
      }
    });
    observer.observe(canvas);
    resize();

    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }
    frame = requestAnimationFrame(draw);
    ready = true;

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700"
  class:opacity-0={!ready}
  aria-hidden="true"
></canvas>
