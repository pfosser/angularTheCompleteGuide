import { createReducer } from '@ngrx/store';

const initialState = 0;

// export const counterReducer = createReducer(initialState);

// Older but still valid way to create reducers
export function counterReducer(state = initialState) {
  return state;
}
