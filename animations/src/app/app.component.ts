import {
  animate,
  keyframes,
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
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
        }),
        animate(
          1000,
          style({
            borderRadius: '50px',
          })
        ),
        animate(500),
      ]),
    ]),
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)', // css setup here
        })
      ),
      // There is a specific state for this case that a element hasn't been added yet,
      // that's void. So void is a reserved state name. You can't use it. You shouldn't
      // override it. Void is provided by you of four cases where you do have an element
      // in an end state which wasn't added to the dom at the beginning. Or of course you
      // could also add void as the transition to state. So if you remove a element for
      // example.
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)', // css setup here
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: 'translateX(0px)',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
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
    this.list.splice(this.list.indexOf(item), 1);
  }
}
