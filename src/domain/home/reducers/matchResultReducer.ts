import React from 'react';
import {ReducerAction} from '../../ReducerAction';
import withViewModelReducer from '../../withViewModelReducer';
import {MatchResultViewState} from '../vm/MatchResultViewModel';
import {MatchResultActionPayload, MatchResultActionType} from './matchActionCreator';

export type MatchResultAction = ReducerAction<MatchResultActionType, MatchResultActionPayload>;

export type MatchResultReducer = React.Reducer<MatchResultViewState, MatchResultAction>;

export const matchResultInitialState: MatchResultViewState = {
  isLoading: false,
  title: '',
  message: '',
};

const matchResultReducer: MatchResultReducer = (
  state: MatchResultViewState,
  action: MatchResultAction,
) => {
  switch (action.type) {
    case 'updateMatchResult':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default withViewModelReducer(matchResultReducer);
