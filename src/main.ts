import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Prevent browser from restoring scroll position on refresh
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
