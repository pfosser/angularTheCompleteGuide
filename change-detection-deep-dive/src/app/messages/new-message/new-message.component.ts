import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  // Also with this setting, a key stroke in the form
  // has an effect on the counter component.
  // On push does not restrict events from affecting other components.
  // Instead all on push does is it makes sure that this component
  // does not get evaluated unnecessarily.
  // But if an event occurs in this component like that keystroke event,
  // then of course, the parent Components of this component
  // will be notified all the way up to the app component and that then
  // will in the end lead to the entire component tree being checked.
  // And the only way of changing that and potentially improving the application
  // therefore, is to go to the place where change detection should be avoided,
  // not in the place where the event occurred. So in this case, if the counter
  // should maybe not be reevaluated when we enter text in this message box here,
  // we have to go to that counter component, not to the new message component.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent {
  private messagesService = inject(MessagesService);
  enteredText = '';

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    this.messagesService.addMessage(this.enteredText);
    this.enteredText = '';
  }
}
