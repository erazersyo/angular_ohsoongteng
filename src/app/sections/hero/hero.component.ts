import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);

  private roles = ['Software Developer', 'System Engineer', 'Frontend Engineer'];

  currentRole = '';
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;

  get resumeHref() {
    return 'assets/resume.pdf';
  }

  ngOnInit() {
    this.typeRole();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();

    const element = document.getElementById(sectionId);
    if (!element) {
      window.location.hash = sectionId;
      return;
    }

    const offset = 90;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }

  private typeRole() {
    const full = this.roles[this.roleIndex];
    if (this.isDeleting) {
      this.currentRole = full.substring(0, --this.charIndex);
    } else {
      this.currentRole = full.substring(0, ++this.charIndex);
    }
    let delay = this.isDeleting ? 55 : 95;
    if (!this.isDeleting && this.charIndex === full.length) {
      delay = 1800; this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 400;
    }
    this.timer = setTimeout(() => this.typeRole(), delay);
  }
}
