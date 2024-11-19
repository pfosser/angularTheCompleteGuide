import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  tasks = signal<Task[]>([]);

  addTask(taskData: { title: string; description: string }) {
    this.tasks.update((oldTasks) => [
      ...oldTasks,
      {
        ...taskData,
        id: Math.random().toString(),
        status: 'OPEN',
      },
    ]);
  }
}
