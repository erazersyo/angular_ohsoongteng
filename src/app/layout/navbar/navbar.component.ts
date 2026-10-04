import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  langService = inject(LanguageService);

  isScrolled = false;
  menuOpen = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggle() {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.close();

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

  close() {
    this.menuOpen = false;
  }
}
