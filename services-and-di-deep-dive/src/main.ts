import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

export const TasksServiceToken = new InjectionToken<TasksService>(
  'tasks-service-token'
);

// Alternative way to provide an injectable with the Application root environment injector.
// This approach doesn't permit tree-shaking of the injectable, so annotating with
// @Injectable() is the preferred way
bootstrapApplication(AppComponent, {
  // The syntax normally used is a shortcut for something like the following
  providers: [{ provide: TasksServiceToken, useClass: TasksService }],
}).catch((err) => console.error(err));
// bootstrapApplication(AppComponent).catch((err) => console.error(err));
