/** Lightweight canvas confetti / hearts burst. No dependencies. */
type Particle = {
  x: number; y: number; vx: number; vy: number; rot: number; vr: number;
  size: number; color: string; shape: "rect" | "heart"; life: number;
};

const COLORS = ["#ff8fb8", "#ffc2d8", "#c9a7f5", "#ffd7a8", "#fff1b8", "#ffffff"];
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let raf = 0;

function ensureCanvas() {
  if (canvas || typeof document === "undefined") return;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed", inset: "0", width: "100%", height: "100%",
    pointerEvents: "none", zIndex: "60",
  } as CSSStyleDeclaration);
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
}

function resize() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawHeart(c: CanvasRenderingContext2D, s: number) {
  c.beginPath();
  c.moveTo(0, s * 0.3);
  c.bezierCurveTo(0, -s * 0.1, -s, -s * 0.1, -s, s * 0.35);
  c.bezierCurveTo(-s, s * 0.8, 0, s, 0, s * 1.3);
  c.bezierCurveTo(0, s, s, s * 0.8, s, s * 0.35);
  c.bezierCurveTo(s, -s * 0.1, 0, -s * 0.1, 0, s * 0.3);
  c.fill();
}

function loop() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.filter((p) => p.life > 0 && p.y < window.innerHeight + 60);
  for (const p of particles) {
    p.life -= 1;
    p.vy += 0.13;
    p.vx *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 60));
    ctx.fillStyle = p.color;
    if (p.shape === "heart") drawHeart(ctx, p.size * 0.55);
    else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }
  if (particles.length) raf = requestAnimationFrame(loop);
  else { cancelAnimationFrame(raf); raf = 0; }
}

export function burst(opts?: { x?: number; y?: number; count?: number; hearts?: boolean; spread?: number }) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ensureCanvas();
  const count = opts?.count ?? 90;
  const x = opts?.x ?? window.innerWidth / 2;
  const y = opts?.y ?? window.innerHeight / 2;
  const spread = opts?.spread ?? Math.PI * 2;
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread;
    const speed = 5 + Math.random() * 9;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      size: 7 + Math.random() * 9,
      color: COLORS[(Math.random() * COLORS.length) | 0]!,
      shape: opts?.hearts && Math.random() > 0.45 ? "heart" : "rect",
      life: 140 + Math.random() * 90,
    });
  }
  if (particles.length > 600) particles = particles.slice(-600);
  if (!raf) raf = requestAnimationFrame(loop);
}

/** Celebration: a few bursts from different points. */
export function celebrate(hearts = true) {
  burst({ x: window.innerWidth * 0.2, y: window.innerHeight * 0.75, count: 70, hearts });
  setTimeout(() => burst({ x: window.innerWidth * 0.8, y: window.innerHeight * 0.7, count: 70, hearts }), 180);
  setTimeout(() => burst({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.55, count: 90, hearts }), 360);
}
