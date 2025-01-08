import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();

  private usersService = inject(UsersService);

  private activatedRoute = inject(ActivatedRoute);

  private destroyRef = inject(DestroyRef);

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name,
  // );
  userName = '';

  // Router parameter binding on the key 'message' of the static data associated
  // with the route
  message = input.required<string>();

  ngOnInit(): void {
    console.log('Input data :>> ', this.message());
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) =>
        (this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || ''),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
