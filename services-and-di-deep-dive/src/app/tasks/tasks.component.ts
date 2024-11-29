import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // Way of providing something through the element injector.
  // That something will be available to the element and all
  // the contained elements (those used in the template).
  // providers: [TasksService],
})
export class TasksComponent {}
