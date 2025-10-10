export interface CounterState {
  count: number;
  toggle: boolean;
}
export const initialState: CounterState = {
  count: 0,
  toggle: false
};