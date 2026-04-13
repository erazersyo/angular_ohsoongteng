import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Personal Portfolio Website',
      description: 'Modern Angular portfolio with responsive sections and smooth animations.',
    },
    {
      title: 'Online Gamestore',
      description: 'University project for buying, renting and trading games online.',
    },
  ];
}
