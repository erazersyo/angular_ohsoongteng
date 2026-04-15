import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { IntroComponent } from '../../layout/intro/intro.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { SkillsComponent } from '../../sections/skills/skills.component';
import { ExperienceComponent } from '../../sections/experience/experience.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { ContactComponent } from '../../sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    IntroComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  template: `
    <app-intro *ngIf="showIntro" (done)="onIntroDone()"></app-intro>
    <div class="site-content" [class.visible]="contentVisible">
      <app-navbar></app-navbar>
      <app-hero></app-hero>
      <app-experience></app-experience>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-contact></app-contact>
    </div>
  `,
  styles: [`
    .site-content {
      opacity: 0;
      transition: opacity 0.5s ease;
      &.visible { opacity: 1; }
    }
  `],
})
export class HomeComponent {
  showIntro = true;
  contentVisible = false;

  onIntroDone() {
    this.showIntro = false;
    setTimeout(() => (this.contentVisible = true), 30);
  }
}
