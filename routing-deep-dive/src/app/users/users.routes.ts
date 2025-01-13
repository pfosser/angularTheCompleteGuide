import { Routes } from '@angular/router';

import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    // In our scenario it would not matter if set to prefix or full
    // prefix means that the combined path (of this one and parent root)
    // must be a prefix of the url in the browser
    // full means that they must match exactly
    pathMatch: 'prefix',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    // The default behavior by Angular is that these resolver functions will be re executed
    // if a route parameter changes, but not if a query parameter changes.
    // You can configure it differently, though
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];
