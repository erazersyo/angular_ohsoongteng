import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  langService = inject(LanguageService);

  skills = [
    { name: 'HTML5', icon: 'assets/html.png' },
    { name: 'CSS3', icon: 'assets/css.png' },
    { name: 'JavaScript', icon: 'assets/js.png' },
    { name: 'Angular', icon: 'assets/angular.png' },
    { name: 'React', icon: 'assets/react.png' },
    { name: 'TypeScript', icon: 'assets/typescript.png' },
    { name: 'Java', icon: 'assets/java.png' },
    { name: 'Spring Boot', icon: 'assets/spring.png' },
    { name: 'Python', icon: 'assets/python.png' },
    { name: 'SQL', icon: 'assets/sql.png' },
    { name: 'Git', icon: 'assets/git.png' },
    { name: 'Docker', icon: 'assets/docker.png' },
  ];

  visible = false;

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
