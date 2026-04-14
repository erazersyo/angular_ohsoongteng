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
  openIndex: number | null = 0;

  experiences = [
    {
      company: '株式会社アジレット',
      companyEn: 'Agirette Inc.',
      companyUrl: 'https://agirette.co.jp',
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
      projects: [
        {
          name: 'Enterprise System Project',
          nameJa: '業務システムプロジェクト',
          url: '',
          logo: '',
          tags: ['Java', 'Spring Boot', 'Oracle DB'],
          achievements: [
            'Designed and implemented core modules for a large-scale enterprise system',
            'Improved query performance by optimising SQL procedures and indexes',
            'Collaborated with Japanese clients to gather requirements and deliver solutions',
          ],
          achievementsJa: [
            '大規模業務システムのコアモジュールを設計・実装',
            'SQLプロシージャとインデックスを最適化しクエリ性能を向上',
            '日本語でクライアントと要件定義を行い、ソリューションを提供',
          ],
        },
      ],
    },
    {
      company: 'Fusionex Group',
      companyEn: 'Fusionex Group',
      companyUrl: 'https://fusionexgroup.com',
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
      projects: [
        {
          name: 'Business Intelligence Dashboard',
          nameJa: 'BIダッシュボード',
          url: '',
          logo: '',
          tags: ['Angular', 'TypeScript', 'REST API', 'Chart.js'],
          achievements: [
            'Built interactive dashboards for real-time business data visualisation',
            'Integrated multiple REST APIs and reduced data load time by 40%',
            'Delivered features across multiple client projects within tight sprint cycles',
          ],
          achievementsJa: [
            'リアルタイムビジネスデータを可視化するインタラクティブなダッシュボードを構築',
            '複数のREST APIを統合し、データ読み込み時間を40%短縮',
            'タイトなスプリントサイクルの中で複数のクライアントプロジェクトに機能を提供',
          ],
        },
      ],
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
