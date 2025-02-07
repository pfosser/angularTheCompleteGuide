import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);

  increment() {
    // this.counter.update((oldValue) => ++oldValue);
    this.counter.set(this.counter() + 1);
    this.actions.update((oldValue) => {
      oldValue.push('INCREMENT');
      return oldValue;
    });
  }

  decrement() {
    this.counter.update((oldValue) => --oldValue);
    this.actions.update((oldValue) => {
      oldValue.push('DECREMENT');
      return oldValue;
    });
  }
}
