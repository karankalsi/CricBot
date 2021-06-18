import {delay} from 'lodash';
import React from 'react';
import {Animated, InteractionManager} from 'react-native';
import {HomeProps} from '../../../ui/screens/dashboard/Home';
import innings, {Player} from '../../innings';
import bangaloreChennaiT20 from '../../innings/bangaloreChennaiT20';
import {ViewModel, ViewModelCallbacks, ViewModelState} from '../../ViewModel';
import createHomeNavigator from '../navigators/HomeNavigator';
import homeActionCreator from '../reducers/homeActionCreator';
import homeReducer, {homeInitialState} from '../reducers/homeReducer';

export interface HomeViewState extends ViewModelState {
  flashScore: string;
  flashScoreHint: string;
  score: string;
  overs: string;
  striker: string;
  runner: string;
  inningEnded: boolean;
}

export interface HomeViewCallbacks extends ViewModelCallbacks {
  onBowlPress: () => void;
}

export interface HomeAnimVal {
  flashScoreOpacity: Animated.Value;
}

export type HomeViewModel = ViewModel & HomeViewState & HomeAnimVal & HomeViewCallbacks;

const flashScoreOpacity = new Animated.Value(0);
let flashScoreAnimation: Animated.CompositeAnimation;

function createFlashScoreAnim() {
  flashScoreAnimation = Animated.sequence([
    Animated.timing(flashScoreOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.delay(600),
    Animated.timing(flashScoreOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]);
}

createFlashScoreAnim();

const useHomeViewModel = (_: HomeProps): HomeViewModel => {
  const [state, dispatch] = React.useReducer(homeReducer, homeInitialState);

  const inningRef = React.useRef(bangaloreChennaiT20());
  const simulatorRef = React.useRef(innings.simulator(inningRef.current));
  const navigator = React.useRef(createHomeNavigator()).current;

  const loadView = React.useCallback(async () => {
    const {current: inning} = inningRef;
    let batsman1 = inning.currentlyBatting.find(item => item.strikerEnd);
    let batsman2 = inning.currentlyBatting.find(item => !item.strikerEnd);
    let batsmanFormatter = (batsman?: Player, star?: boolean) =>
      `${batsman?.name} (${batsman?.score})${star ? '*' : ''}`;
    dispatch(
      homeActionCreator.updateScoreBoard({
        score: `${inning.score} - ${inning.wickets}`,
        overs: `${inning.overs.toFixed(1)}`,
        striker: batsmanFormatter(batsman1, true),
        runner: batsmanFormatter(batsman2),
        inningEnded: inning.end,
      }),
    );
  }, [inningRef]);

  const resetInning = React.useCallback(() => {
    inningRef.current = bangaloreChennaiT20();
    simulatorRef.current = innings.simulator(inningRef.current);
    loadView();
  }, [loadView]);

  const onBowlPress = React.useCallback(() => {
    const {current: inning} = inningRef;
    const evaluateActionResult = (result: string) => {
      dispatch(
        homeActionCreator.updateFlashScore({
          flashScore: result,
          flashScoreHint: Number(result) ? `${Number(result) > 1 ? 'Runs' : 'Run'}` : '',
        }),
      );
      if (inning.end) {
        loadView();
        delay(() => {
          resetInning();
          InteractionManager.runAfterInteractions(navigator.showInningEnd.bind(this, inning));
        }, 500);
      } else {
        loadView();
      }
    };
    simulatorRef.current
      .next()
      .then(evaluateActionResult)
      .then(flashScoreAnimation.start.bind(this, createFlashScoreAnim));
  }, [simulatorRef, inningRef, navigator, loadView, resetInning]);

  React.useEffect(() => {
    loadView();
  }, [loadView]);

  const viewModel: HomeViewModel = {
    loadView,
    flashScoreOpacity,
    onBowlPress,
    ...state,
  };
  return viewModel;
};

export default useHomeViewModel;
