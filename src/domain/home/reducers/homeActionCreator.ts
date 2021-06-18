import {ReducerActionCreator} from '../../ReducerAction';
import withViewModelActionCreator from '../../withViewModelActionCreator';
import {HomeViewState} from '../vm/HomeViewModel';

export type HomeActionType = 'updateScoreBoard' | 'updateFlashScore' | 'resetScoreBoard';

export type UpdateScoreBoardPayload = Pick<
  HomeViewState,
  'score' | 'overs' | 'striker' | 'runner' | 'inningEnded'
>;

export type UpdateFlashScorePayload = Pick<HomeViewState, 'flashScore' | 'flashScoreHint'>;

export type ResetScoreBoardPayload = undefined;

export type HomeActionPayload =
  | UpdateScoreBoardPayload
  | UpdateFlashScorePayload
  | ResetScoreBoardPayload;

export type HomeActionCreator = ReducerActionCreator<HomeActionType, HomeActionPayload>;

const homeActionCreator: HomeActionCreator = {
  updateScoreBoard: (payload: HomeActionPayload) => ({
    type: 'updateScoreBoard',
    payload,
  }),
  updateFlashScore: (payload: HomeActionPayload) => ({
    type: 'updateFlashScore',
    payload,
  }),
  resetScoreBoard: () => ({type: 'resetScoreBoard'}),
};

export default withViewModelActionCreator(homeActionCreator);
