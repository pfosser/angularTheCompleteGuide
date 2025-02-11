import { createReducer, on } from '@ngrx/store';
import { increment } from './counter.actions';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1)
);

// Older but still valid way to create reducers
// export function counterReducer(state = initialState) {
//   return state;
// }
