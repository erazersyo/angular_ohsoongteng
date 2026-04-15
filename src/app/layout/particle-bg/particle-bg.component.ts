import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  bvx: number; bvy: number;   // base drift velocity
  size: number; opacity: number;
}

@Component({
  selector: 'app-particle-bg',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
  `],
})
export class ParticleBgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: -9999, y: -9999 };
  private rafId = 0;

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize(canvas);

    window.addEventListener('resize', () => this.resize(canvas));
    window.addEventListener('mousemove', this.onMouseMove);
    this.loop();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', () => this.resize(this.canvasRef.nativeElement));
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  private resize(canvas: HTMLCanvasElement) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    this.spawnParticles(canvas.width, canvas.height);
  }

  private spawnParticles(w: number, h: number) {
    const count = Math.min(Math.floor((w * h) / 8000), 180);
    this.particles = Array.from({ length: count }, () => {
      const bvx = (Math.random() - 0.5) * 0.08;
      const bvy = (Math.random() - 0.5) * 0.08;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: bvx, vy: bvy,
        bvx, bvy,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.45 + 0.15,
      };
    });
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private loop = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    const w = canvas.width, h = canvas.height;
    const mx = this.mouse.x, my = this.mouse.y;
    const REPEL  = 130;
    const CONNECT = 120;

    ctx.clearRect(0, 0, w, h);

    for (const p of this.particles) {
      // Mouse repulsion
      const dx = p.x - mx, dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL && dist > 0) {
        const f = (REPEL - dist) / REPEL * 0.016;
        p.vx += (dx / dist) * f;
        p.vy += (dy / dist) * f;
      }

      // Drift back toward base velocity so particles always keep moving
      p.vx = p.vx * 0.96 + p.bvx * 0.04;
      p.vy = p.vy * 0.96 + p.bvy * 0.04;
      p.x  += p.vx; p.y  += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      // Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 181, 253, ${p.opacity})`;
      ctx.fill();
    }

    // Connection lines
    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(145, 94, 255, ${(1 - d / CONNECT) * 0.16})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    this.rafId = requestAnimationFrame(this.loop);
  };
}
