import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experiences = [
    {
      company: '株式会社アジレット',
      role: 'System Engineer',
      period: 'Sep 2024 - Present',
      description: 'Building enterprise software systems and collaborating across multicultural teams.',
    },
    {
      company: 'Fusionex Group',
      role: 'Software Developer',
      period: 'Aug 2022 - Feb 2024',
      description: 'Developed features and maintained business applications in fast-paced delivery cycles.',
    },
  ];
}
