import React from 'react';
import {ReducerAction} from '../../ReducerAction';
import withViewModelReducer from '../../withViewModelReducer';
import {HomeViewState} from '../vm/HomeViewModel';
import {HomeActionPayload, HomeActionType} from './homeActionCreator';

export type HomeAction = ReducerAction<HomeActionType, HomeActionPayload>;

export type HomeReducer = React.Reducer<HomeViewState, HomeAction>;

export const homeInitialState: HomeViewState = {
  isLoading: false,
  flashScore: '',
  flashScoreHint: '',
  score: '',
  overs: '',
  runner: '',
  striker: '',
  inningEnded: false,
};

const homeReducer: HomeReducer = (state: HomeViewState, action: HomeAction) => {
  switch (action.type) {
    case 'updateScoreBoard':
    case 'updateFlashScore':
      return {
        ...state,
        ...action.payload,
      };
    case 'resetScoreBoard':
      return homeInitialState;
    default:
      return state;
  }
};

export default withViewModelReducer(homeReducer);
