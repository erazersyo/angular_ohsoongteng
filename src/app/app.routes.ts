import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JourneyComponent } from './pages/journey/journey.component';

export const routes: Routes = [
  { path: '',        component: HomeComponent },
  { path: 'journey', component: JourneyComponent },
  { path: '**',      redirectTo: '' },
];
