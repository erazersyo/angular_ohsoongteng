import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skills = [
    { name: 'HTML', icon: 'assets/html.png' },
    { name: 'CSS', icon: 'assets/css.png' },
    { name: 'JavaScript', icon: 'assets/js.png' },
    { name: 'Angular', icon: 'assets/angular.png' },
    { name: 'React', icon: 'assets/react.png' },
  ];
}
