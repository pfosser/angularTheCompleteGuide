import { Component, inject, input } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userName = input.required<string>();

  // Router parameter binding on the key 'message' of the static data associated
  // with the route
  message = input.required<string>();

  // private activatedRoute = inject(ActivatedRoute);

  // private destroyRef = inject(DestroyRef);

  // ngOnInit(): void {
  //   // data is an observable emitting the merge of dynamic and static route data
  //   // every time the route changes
  //   const subscription = this.activatedRoute.data.subscribe({
  //     next: (data) => console.log(data),
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId'),
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  return resolveUserName(activatedRoute, routerState) + "' Tasks"; // Max's Tasks
};
