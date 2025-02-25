import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    // Name totally up to the user: when in the DOM, it tells to apply the animation to it.
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)', // css setup here
        })
      ),
      state(
        'highlighted',
        style({
          // must use the same naming style
          'background-color': 'blue',
          transform: 'translateX(100px)',
        })
      ),
      // transition('normal => highlighted', animate(300)),
      // transition('highlighted => normal', animate(800)),
      // Back and forth using the same animate function
      transition('normal <=> highlighted', animate(300)),
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          // must use the same naming style
          'background-color': 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          'background-color': 'green',
          transform: 'translateX(0) scale(0.5)',
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', animate(500)),
    ]),
  ],
})
export class AppComponent {
  state = 'normal'; // could be any kind of value
  wildState = 'normal'; // could be any kind of value
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    throw new Error('Method not implemented.');
  }
}
