import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment } from './counter.actions';
import { tap } from 'rxjs';

export class CounterEffects {
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        tap((action) => {
          console.log(action);
          localStorage.setItem('count', action.value.toString());
        })
      ),
    { dispatch: false } // makes clear that this effect does not dispatch actions
  );

  constructor(private actions$: Actions) {}
}
