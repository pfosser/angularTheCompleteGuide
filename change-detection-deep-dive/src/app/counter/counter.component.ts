import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  private zone = inject(NgZone);

  count = signal(0);

  ngOnInit(): void {
    // The expiration of timers make cd run
    setTimeout(() => {
      this.count.set(0);
    }, 4000);

    // this makes the code to run outside of the zone "watching-mode",
    // so cd will not be triggered when the timer expires.
    // This is said as "not polluting the zone", because you're not
    // polluting zone.js with events that don't matter in the end.
    this.zone.runOutsideAngular(() => {
      // This timer has nothing to do with the template
      setTimeout(() => {
        console.log('Timer expired');
      }, 5000);
    });
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
