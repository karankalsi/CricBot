export interface ReducerAction<T extends string, P> {
  type: T;
  payload?: P;
}

export type ReducerActionCall<T extends string, P> = (payload: P) => ReducerAction<T, P>;

export type ReducerActionCreator<T extends string, P> = Record<T, ReducerActionCall<T, P>>;
