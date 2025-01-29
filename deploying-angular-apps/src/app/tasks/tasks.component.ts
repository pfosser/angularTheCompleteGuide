import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, ResolveFn, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';
import { toSignal } from '@angular/core/rxjs-interop';

// With the previous implementation we had a resolver here,
// which read the signal once, not setting up a subscription
// to then prepare the tasks for the user.
// And then those tasks were made available through an input.
// On the client side, once the finished page had been received,
// this resolver did not run again, so we didn't fetch the
// updated tasks there.
// Now, to fix this bug, it would probably be best
// to use a different data source, a data source that also
// works on the server, like a separate backend to which we
// send requests with Angular's HTTP client, for example.
// That would make sure that the code runs on the server
// and the appropriate data is fetched on the server already,
// so that we don't have this mismatch between client-side code
// and server-side code.
// If you don't want to do that or you can't do that, it would
// probably be best to get rid of that resolver
// and instead load the tasks in the component based
// on the signal so that when the signal changes,
// which it does here once the tasks have been loaded,
// the component is updated.
@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private paramMap = toSignal(this.activatedRoute.paramMap);
  order = input<'asc' | 'desc' | undefined>();
  userTasks = computed(() => {
    const tasks = this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.paramMap()?.get('userId'));

    if (this.order() && this.order() === 'asc') {
      tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else {
      tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
    }

    return tasks.length ? tasks : [];
  });
  userId = input.required<string>();
}
