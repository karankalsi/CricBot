import {ReducerActionCreator} from './ReducerAction';
import {ViewModelState} from './ViewModel';

export type ViewModelReducerActionType = 'setLoading';

export type ViewModelReducerLoadingPayLoad = Pick<ViewModelState, 'isLoading'>;

export type ViewModelReducerActionPayload = ViewModelReducerLoadingPayLoad;

export type ViewModelActionCreator = ReducerActionCreator<
  ViewModelReducerActionType,
  ViewModelReducerActionPayload
>;

const viewModelActionCreator: ViewModelActionCreator = {
  setLoading: (payload: ViewModelReducerActionPayload) => ({type: 'setLoading', payload}),
};

const withViewModelActionCreator = <T extends string, P>(
  actionCreator: ReducerActionCreator<T, P>,
) => {
  return {
    ...viewModelActionCreator,
    ...actionCreator,
  };
};

export default withViewModelActionCreator;
