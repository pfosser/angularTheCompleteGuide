import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { User } from '../users/user/user.model';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  // By default child routes cannot get parent route parameters through input
  // binding (only through ActivatedRoute).
  // To overome the limitation you have to explicitly configure it (see app.config.ts)
  userId = input.required<string>();

  // Query parametere binding
  // order = input<'asc' | 'desc'>();

  order?: 'asc' | 'desc';

  private tasksService = inject(TasksService);

  private destroyRef = inject(DestroyRef);

  userTasks = computed(() =>
    this.tasksService.allTasks().filter((t) => t.userId === this.userId()),
  );

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order = params['order']),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
