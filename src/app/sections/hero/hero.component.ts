import { Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  ngAfterViewInit() {
    gsap.from('.content h1', {
      y: 20,
      opacity: 0,
      duration: 0.6,
    });

    gsap.from('.content h2', {
      y: 50,
      opacity: 0,
      duration: 0.9,
      delay: 0.2,
    });

    gsap.from('.content p', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
    });

    gsap.from('.buttons a', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.6,
      stagger: 0.12,
    });
  }
}
