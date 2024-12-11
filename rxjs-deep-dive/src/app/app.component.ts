import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  // toObservable can be used only in injection contexts
  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000);

  // toSignal too can be used only in injection contexts
  // running the app you can see that initially there is no value:
  // it is a difference between signal and observable.
  // Angular gives the undefined value to a signal created in this way,
  // unless you specify one in the configuration object.
  // The unsubscription to the original observable is managed by Angular
  // unless you specify differently in the config obj.
  intervalSignal = toSignal(this.interval$, {
    initialValue: 42,
    // manualCleanup: true,
  });

  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
    // toObservable can be used only in injection contexts
    // toObservable(this.clickCount);
  }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((v) => v + 1);
  }
}
