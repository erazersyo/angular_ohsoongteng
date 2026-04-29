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
    { name: 'Angular',       icon: 'assets/angular.svg'  },
    { name: 'Vue',           icon: 'assets/vue.svg'       },
    { name: 'JavaScript',    icon: 'assets/js.svg'        },
    { name: 'TypeScript',    icon: 'assets/typescript.svg'},
    { name: 'HTML5',         icon: 'assets/html.svg'      },
    { name: 'CSS3',          icon: 'assets/css.svg'       },
    { name: 'Node.js',       icon: 'assets/node.svg'      },
    { name: 'MySQL',         icon: 'assets/mysql.svg'     },
    { name: 'MongoDB',       icon: 'assets/mongodb.svg'   },
    { name: 'GitLab',        icon: 'assets/gitlab.svg'    },
    { name: 'Google Cloud',  icon: 'assets/gcp.svg'       },
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
