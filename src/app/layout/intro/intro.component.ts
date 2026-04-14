import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit {
  @Output() done = new EventEmitter<void>();

  @ViewChild('overlay', { static: true }) overlayEl!: ElementRef<HTMLElement>;
  @ViewChild('sLetter', { static: true }) sLetterEl!: ElementRef<HTMLElement>;
  @ViewChild('tLetter', { static: true }) tLetterEl!: ElementRef<HTMLElement>;
  @ViewChild('letters', { static: true }) lettersEl!: ElementRef<HTMLElement>;

  ngOnInit() {
    const overlay = this.overlayEl.nativeElement;
    const s = this.sLetterEl.nativeElement;
    const t = this.tLetterEl.nativeElement;
    const letters = this.lettersEl.nativeElement;

    // Initial state
    gsap.set([s, t], { opacity: 0, y: 40 });
    gsap.set(overlay, { opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => this.done.emit(),
    });

    tl
      // S letter slides up
      .to(s, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.2)
      // T letter slides up with slight stagger
      .to(t, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.4)
      // Brief hold — subtle pulse
      .to(letters, { scale: 1.06, duration: 0.22, ease: 'power2.inOut' }, 1.3)
      .to(letters, { scale: 1,    duration: 0.22, ease: 'power2.inOut' }, 1.52)
      // Slide overlay up and out
      .to(overlay, { yPercent: -100, duration: 0.75, ease: 'power3.inOut' }, 1.9);
  }
}
