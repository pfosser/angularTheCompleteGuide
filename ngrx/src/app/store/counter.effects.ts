import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { decrement, increment, init, set } from './counter.actions';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  loadCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storeCounter = localStorage.getItem('count') ?? '0';
        return of(set({ value: +storeCounter }));
      })
    )
  );

  saveCount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log(action);
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false } // makes clear that this effect does not dispatch actions
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}

// Old approach (not supported anymore)
// export class CounterEffects {
//   @Effect({dispatch: false})
//   saveCount = this.actions$.pipe(
//     ofType(increment, decrement),
//     tap((action) => {
//       console.log(action);
//       localStorage.setItem('count', action.value.toString());
//     })
//   );

//   constructor(private actions$: Actions) {}
// }
