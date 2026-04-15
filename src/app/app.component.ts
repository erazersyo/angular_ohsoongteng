import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParticleBgComponent } from './layout/particle-bg/particle-bg.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParticleBgComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
