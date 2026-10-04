import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Let hash links and normal scrolling work correctly.
history.scrollRestoration = 'auto';
window.scrollTo(0, 0);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
