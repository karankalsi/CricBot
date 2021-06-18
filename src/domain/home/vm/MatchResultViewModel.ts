import React from 'react';
import {MatchResultProps} from '../../../ui/screens/dashboard/MatchResult';
import {MAX_WICKETS} from '../../innings';
import {ViewModel, ViewModelCallbacks, ViewModelState} from '../../ViewModel';
import createMatchResultNavigator from '../navigators/MatchResultNavigator';
import matchResultActionCreator from '../reducers/matchActionCreator';
import matchResultReducer, {matchResultInitialState} from '../reducers/matchResultReducer';

export interface MatchResultViewState extends ViewModelState {
  title: string;
  message: string;
}

export interface MatchResultViewCallbacks extends ViewModelCallbacks {
  onStartOver: () => void;
}

export type MatchResultViewModel = ViewModel & MatchResultViewState & MatchResultViewCallbacks;

export const useMatchResultViewModel = (props: MatchResultProps): MatchResultViewModel => {
  const {inning} = props;
  const [state, dispatch] = React.useReducer(matchResultReducer, matchResultInitialState);
  const navigator = React.useRef(createMatchResultNavigator(props.componentId)).current;
  const onStartOver = React.useCallback(() => {
    navigator.dismiss();
  }, [navigator]);

  const loadView = React.useCallback(async () => {
    const scoreDiff = inning.target - inning.score;
    const wicketsLeft = MAX_WICKETS - inning.wickets;
    const oversDiff = Math.ceil(inning.maxOvers - inning.overs);
    const ballsLeft = ((oversDiff * 10) / 10) * 6 + ((oversDiff * 10) % 10);

    const title = `${inning.team1} vs ${inning.team2}`;
    const message =
      scoreDiff > 0
        ? `${inning.team2} won by ${scoreDiff} runs`
        : `${inning.team1} won by ${wicketsLeft} wickets (${ballsLeft.toFixed()} ${
            ballsLeft > 1 ? 'balls' : 'ball'
          } left)`;

    dispatch(matchResultActionCreator.updateMatchResult({title, message}));
  }, [inning]);

  React.useEffect(() => {
    loadView();
  }, [loadView]);

  const viewModel: MatchResultViewModel = {
    loadView,
    onStartOver,
    ...state,
  };
  return viewModel;
};

export default useMatchResultViewModel;
