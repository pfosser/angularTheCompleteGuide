import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  // The on push change detection strategy
  // in the end tells Angular
  // that the component for which you enabled it
  // will only ever change because:
  // * some event occurred inside of this sub component tree;
  // * an input value changed in that component;
  // * a signal change (it could not matter if the signal is
  // changed inside an event handler);
  // * cd is triggered manually.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }
}
