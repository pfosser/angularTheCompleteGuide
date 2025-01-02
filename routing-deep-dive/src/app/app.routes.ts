import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { routes as userRoutes } from './users/users.routes';

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
  },
  {
    // catch-all route
    path: '**',
    component: NotFoundComponent,
  },
];
