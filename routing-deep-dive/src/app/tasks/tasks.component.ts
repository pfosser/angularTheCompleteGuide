import { Component, computed, inject, input } from '@angular/core';

import { User } from '../users/user/user.model';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  // By default child routes cannot get parent route parameters through input
  // binding (only through ActivatedRoute).
  // To overome the limitation you have to explicitly configure it (see app.config.ts)
  userId = input.required<string>();

  // Query parametere binding
  order = input<'asc' | 'desc'>();

  private tasksService = inject(TasksService);

  userTasks = computed(() =>
    this.tasksService.allTasks().filter((t) => t.userId === this.userId()),
  );
}
