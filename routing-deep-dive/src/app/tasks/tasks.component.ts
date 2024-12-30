import { Component, input } from '@angular/core';

import { User } from '../users/user/user.model';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  // By default child routes cannot get parent route parameters through input
  // binding (only through ActivatedRoute).
  // To overome the limitation you have to explicitly configure it (see app.config.ts)
  userId = input.required<User>();

  userTasks: Task[] = [];
}
