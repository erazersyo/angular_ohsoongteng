import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements OnInit {
  langService = inject(LanguageService);
  visible = false;
  openIndex: number | null = 0; // first card open by default

  experiences = [
    {
      company: '株式会社アジレット',
      logo: 'assets/logos/agirette.png',
      role: 'System Engineer',
      roleJa: 'システムエンジニア',
      period: 'Sep 2024 – Present',
      periodJa: '2024年9月〜現在',
      description:
        'Building enterprise software systems in Japan, collaborating across multicultural teams to deliver scalable, high-quality solutions.',
      descriptionJa:
        '日本で企業向けソフトウェアシステムを構築し、多文化チームと協力してスケーラブルで高品質なソリューションを提供しています。',
      tags: ['Java', 'Spring Boot', 'SQL', 'Git'],
    },
    {
      company: 'Fusionex Group',
      logo: 'assets/logos/fusionex.png',
      role: 'Software Developer',
      roleJa: 'ソフトウェアデベロッパー',
      period: 'Aug 2022 – Feb 2024',
      periodJa: '2022年8月〜2024年2月',
      description:
        'Developed and maintained business web applications in fast-paced delivery cycles using modern frontend and backend technologies.',
      descriptionJa:
        '最新のフロントエンド・バックエンド技術を活用し、迅速な開発サイクルでビジネス向けWebアプリケーションの開発・保守を担当しました。',
      tags: ['Angular', 'TypeScript', 'JavaScript', 'REST API'],
    },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this.el.nativeElement);
  }

  toggleCard(i: number) {
    this.openIndex = this.openIndex === i ? null : i;
  }
}
