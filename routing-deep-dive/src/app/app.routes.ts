import { inject } from '@angular/core';
import {
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { routes as userRoutes } from './users/users.routes';

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random() < 0.5;
  if (shouldGetAccess) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    title: 'No task selected',
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    // this resolver will be called for every navigation action.
    // So every time this route gets active, this resolver function will be called
    // and it will then receive the latest snapshot that describes this activated route.
    // That's why there is no reason to subscribe to it here because it will be re executed.
    // This function will be re executed whenever the route becomes active,
    // even if it already was active.  So it will be called again if the route parameter
    // changes, for example.
    resolve: {
      // The value returned by the function will be made available to the component
      // in an input with the name of the key, thanks to route parameter binding
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    // catch-all route
    path: '**',
    component: NotFoundComponent,
  },
];
