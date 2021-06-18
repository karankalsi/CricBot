import {ReducerActionCreator} from '../../ReducerAction';
import withViewModelActionCreator from '../../withViewModelActionCreator';
import {MatchResultViewState} from '../vm/MatchResultViewModel';

export type MatchResultActionType = 'updateMatchResult';

export type UpdateMatchResultPayload = Pick<MatchResultViewState, 'title' | 'message'>;

export type MatchResultActionPayload = UpdateMatchResultPayload;

export type MatchResultActionCreator = ReducerActionCreator<
  MatchResultActionType,
  MatchResultActionPayload
>;

const matchResultActionCreator: MatchResultActionCreator = {
  updateMatchResult: (payload: MatchResultActionPayload) => ({
    type: 'updateMatchResult',
    payload,
  }),
};

export default withViewModelActionCreator(matchResultActionCreator);
