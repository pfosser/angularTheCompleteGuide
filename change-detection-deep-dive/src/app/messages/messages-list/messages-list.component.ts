import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessagesService } from '../messages.service';

// With this setup (no signals and OnPush), the addition of a message
// doesn't trigger a cd and the new message doesn't show up in the list
@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  get messages() {
    return this.messagesService.allMessages;
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
