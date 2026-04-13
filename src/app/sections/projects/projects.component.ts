import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  langService = inject(LanguageService);
  visible = false;

  projects = [
    {
      title: 'Personal Portfolio Website',
      titleJa: 'パーソナルポートフォリオ',
      description:
        'Modern Angular portfolio with responsive sections, scroll-triggered animations, typewriter effects, and a sleek dark space theme.',
      descriptionJa:
        'レスポンシブデザイン、スクロールアニメーション、タイプライター効果、ダークテーマを採用したモダンなAngularポートフォリオサイト。',
      tech: ['Angular', 'TypeScript', 'SCSS', 'GSAP'],
      github: '',
      demo: '',
    },
    {
      title: 'Online Gamestore',
      titleJa: 'オンラインゲームストア',
      description:
        'Full-stack university project for buying, renting, and trading games online with user authentication and product management.',
      descriptionJa:
        'ユーザー認証・商品管理機能を備えた、ゲームのオンライン購入・レンタル・取引ができる大学のフルスタックプロジェクト。',
      tech: ['Java', 'Spring Boot', 'MySQL', 'HTML/CSS'],
      github: '',
      demo: '',
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
}
