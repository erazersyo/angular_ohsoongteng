import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);

  private rolesEn = ['Software Developer', 'System Engineer', 'Frontend Engineer'];
  private rolesJa = ['ソフトウェアデベロッパー', 'システムエンジニア', 'フロントエンドエンジニア'];

  currentRole = '';
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;
  private prevLang: 'en' | 'ja' | null = null;

  constructor() {
    // Restart typewriter whenever language changes
    effect(() => {
      const lang = this.langService.lang();
      if (this.prevLang !== null && this.prevLang !== lang) {
        this.restartTypewriter();
      }
      this.prevLang = lang;
    });
  }

  get roles() {
    return this.langService.lang() === 'ja' ? this.rolesJa : this.rolesEn;
  }

  get resumeHref() {
    return this.langService.lang() === 'ja' ? 'assets/resume-ja.pdf' : 'assets/resume.pdf';
  }

  ngOnInit() {
    this.typeRole();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  private restartTypewriter() {
    clearTimeout(this.timer);
    this.currentRole = '';
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.timer = setTimeout(() => this.typeRole(), 300);
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
      delay = 1800;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 400;
    }

    this.timer = setTimeout(() => this.typeRole(), delay);
  }
}
