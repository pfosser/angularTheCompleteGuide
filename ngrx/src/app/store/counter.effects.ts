import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment } from './counter.actions';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
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
