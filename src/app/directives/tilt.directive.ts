import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  private el: HTMLElement;

  constructor(ref: ElementRef<HTMLElement>) {
    this.el = ref.nativeElement;
    this.el.style.willChange = 'transform';
  }

  @HostListener('mouseenter')
  onEnter() {
    this.el.style.transition = 'transform 0.12s ease, box-shadow 0.3s ease';
  }

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent) {
    const rect = this.el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const tiltX = -((y - cy) / cy) * 8;
    const tiltY =  ((x - cx) / cx) * 10;
    this.el.style.transform  = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    this.el.style.transition = 'transform 0.06s ease';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.style.transform  = '';
    this.el.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease';
  }
}
