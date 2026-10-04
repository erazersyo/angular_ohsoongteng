import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChildren, QueryList, ElementRef, HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface TimelineEvent {
  year: number;
  endYear?: number;
  title: string;
  subtitle?: string;
  description: string;
  type: 'life' | 'education' | 'work';
  icon: string;
  detail?: string;
  location?: string;
}

export interface LifePhoto {
  src: string;
  alt: string;
  caption: string;
  tag: 'Life' | 'Travel' | 'Work' | 'Memory';
}

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('eventCard') cards!: QueryList<ElementRef<HTMLElement>>;

  activeIndex: number | null = null;
  lightboxPhoto: LifePhoto | null = null;
  private observer!: IntersectionObserver;

  events: TimelineEvent[] = [
    {
      year: 1999,
      title: 'A New Beginning',
      description: 'Born into the world — the start of a long journey.',
      type: 'life',
      icon: '🌟',
      detail: 'Every great story has a starting point. This is mine.',
      location: 'Malaysia',
    },
    {
      year: 2006,
      endYear: 2011,
      title: 'Primary School',
      subtitle: 'SJKC Bukit Beruang',
      description: 'Six formative years building the foundation — curiosity, discipline, and a love for learning.',
      type: 'education',
      icon: '📚',
      detail: 'Where it all began academically. Early exposure to mathematics and sciences sparked a lasting interest in problem-solving.',
      location: 'Melaka, Malaysia',
    },
    {
      year: 2011,
      endYear: 2016,
      title: 'Secondary School',
      subtitle: 'ST. David High School',
      description: 'Five years of growth — academically and personally. Developed leadership skills and a deeper passion for technology.',
      type: 'education',
      icon: '🏫',
      detail: 'Participated in competitions, discovered programming fundamentals, and began exploring what a career in tech could look like.',
      location: 'Melaka, Malaysia',
    },
    {
      year: 2017,
      endYear: 2019,
      title: 'Tertiary Education',
      subtitle: 'SMJK Yok Bin',
      description: 'Pre-university studies — pushing academic limits and preparing for the next big chapter.',
      type: 'education',
      icon: '🎓',
      detail: 'Focused heavily on science and mathematics streams, laying the groundwork for a degree in engineering.',
      location: 'Melaka, Malaysia',
    },
    {
      year: 2019,
      endYear: 2022,
      title: 'Bachelor\'s Degree',
      subtitle: 'Universiti Tun Hussein Onn Malaysia (UTHM)',
      description: 'Pursued a degree in Computer Science / Software Engineering — where code became a craft.',
      type: 'education',
      icon: '🏛️',
      detail: 'Deep-dived into software architecture, web development, databases, and systems design. Built multiple projects that bridged theory with real-world application.',
      location: 'Johor, Malaysia',
    },
    {
      year: 2022,
      endYear: 2024,
      title: 'Software Engineer',
      subtitle: 'Fusionex Group',
      description: 'Joined as an intern and was promoted to a permanent position — turning academic knowledge into industry-grade software.',
      type: 'work',
      icon: '💼',
      detail: 'Worked on data analytics platforms and enterprise web applications. Gained hands-on experience with full-stack development, agile workflows, and delivering production-ready features.',
      location: 'Kuala Lumpur, Malaysia',
    },
    {
      year: 2024,
      title: 'Software Engineer',
      subtitle: 'Agile and Team',
      description: 'A bold move across borders — brought skills to the heart of Japan\'s tech scene.',
      type: 'work',
      icon: '🗼',
      detail: 'Working in an international environment in Tokyo, collaborating with Japanese and global teams. Embracing new cultures, new challenges, and new levels of professional growth.',
      location: 'Tokyo, Japan',
    },
  ];

  // ── Replace src values with your actual photo paths (e.g. 'assets/photos/tokyo.jpg') ──
  photos: LifePhoto[] = [
    { src: 'assets/photos/photo-1.jpg', alt: 'Photo 1',  caption: 'Chapter closed: Form 6 edition',       tag: 'Life'   },
    { src: 'assets/photos/photo-2.jpg', alt: 'Photo 2',  caption: 'Chapter complete 🎓',   tag: 'Life' },
    { src: 'assets/photos/photo-3.jpg', alt: 'Photo 3',  caption: 'Hakone state of mind',           tag: 'Travel' },
    { src: 'assets/photos/photo-4.jpg', alt: 'Photo 4',  caption: 'Pure farm joy',        tag: 'Memory' },
    { src: 'assets/photos/photo-5.jpg', alt: 'Photo 5',  caption: 'Hello, sakura seasons',  tag: 'Memory'   },
    { src: 'assets/photos/photo-6.jpg', alt: 'Photo 6',  caption: 'Blue looks good on me', tag: 'Memory'   },
    { src: 'assets/photos/photo-7.jpg', alt: 'Photo 7',  caption: 'Red brick and bright lights',  tag: 'Life'   },
    { src: 'assets/photos/photo-8.jpg', alt: 'Photo 8',  caption: 'Lost in the blossom',  tag: 'Travel' },
    { src: 'assets/photos/photo-9.jpg', alt: 'Photo 9',  caption: 'Kobe calling',   tag: 'Travel' },
    { src: 'assets/photos/photo-10.jpg',alt: 'Photo 10', caption: 'Tokyo City lights',   tag: 'Travel' },
    { src: 'assets/photos/photo-11.jpg',alt: 'Photo 11', caption: 'Lost in Nagoya, found by a cat',   tag: 'Travel'   },
    { src: 'assets/photos/photo-12.jpg',alt: 'Photo 12', caption: 'Ready for my show!',  tag: 'Life' },
  ];

  // Split into two rows for opposite-direction scroll
  get row1(): LifePhoto[] { return this.photos.slice(0, 6); }
  get row2(): LifePhoto[] { return this.photos.slice(6);   }

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    this.cards.forEach((card) => this.observer.observe(card.nativeElement));
    this.cards.changes.subscribe(() => {
      this.cards.forEach((card) => this.observer.observe(card.nativeElement));
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  typeLabel(type: string): string {
    return { life: 'Life', education: 'Education', work: 'Career' }[type] ?? type;
  }

  openLightbox(photo: LifePhoto) {
    this.lightboxPhoto = photo;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxPhoto = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.closeLightbox(); }
}
