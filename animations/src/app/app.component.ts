import { state, style, trigger } from '@angular/animations';
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
          trasform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          trasform: 'translateX(100px)',
        })
      ),
    ]),
  ],
})
export class AppComponent {
  state = 'normal'; // could be any kind of value
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    throw new Error('Method not implemented.');
  }
}
