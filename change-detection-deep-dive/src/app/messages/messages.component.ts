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
  // will only ever change because some event
  // occurred inside of this sub component tree,
  // or because an input value changed
  // in that component, or because cd is triggered
  // manually
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  messages = signal<string[]>([]);

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

  onAddMessage(message: string) {
    this.messages.update((oldMessages) => [...oldMessages, message]);
  }
}
