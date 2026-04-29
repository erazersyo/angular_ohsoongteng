import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  langService = inject(LanguageService);

  skills = [
    { name: 'Angular',       icon: 'assets/angular.png'  },
    { name: 'Vue',           icon: 'assets/vue.png'       },
    { name: 'JavaScript',    icon: 'assets/js.png'        },
    { name: 'TypeScript',    icon: 'assets/typescript.png'},
    { name: 'HTML5',         icon: 'assets/html.png'      },
    { name: 'CSS3',          icon: 'assets/css.png'       },
    { name: 'Node.js',       icon: 'assets/node.png'      },
    { name: 'MySQL',         icon: 'assets/mysql.png'     },
    { name: 'MongoDB',       icon: 'assets/mongodb.png'   },
    { name: 'GitLab',        icon: 'assets/gitlab.png'    },
    { name: 'Google Cloud',  icon: 'assets/gcp.png'       },
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
