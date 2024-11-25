import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

// Alternative way to provide an injectable with the Application root environment injector.
// This approach doesn't permit tree-shaking of the injectable, so annotating with
// @Injectable() is the preferred way
// bootstrapApplication(AppComponent, {
//   providers: [TasksService],
// }).catch((err) => console.error(err));
bootstrapApplication(AppComponent).catch((err) => console.error(err));
