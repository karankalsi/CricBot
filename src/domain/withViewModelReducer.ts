import {ReducerAction} from './ReducerAction';
import {ViewModelState} from './ViewModel';

const withViewModelReducer = <
  AT extends string,
  VP,
  S extends ViewModelState,
  A extends ReducerAction<AT, VP>,
>(
  reducer: React.Reducer<S, A>,
) => {
  return (state: S, action: A) => {
    switch (action.type) {
      case 'setLoading':
        return {
          ...state,
          ...action?.payload,
        };
      default:
        return reducer(state, action);
    }
  };
};

export default withViewModelReducer;
