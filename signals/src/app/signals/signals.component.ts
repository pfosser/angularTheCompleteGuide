import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    // The effect function is not intended to produce a value but to
    // execute some code when the value of one or more signals change.
    effect(() => console.log(this.counter()));
  }

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
