import AppNavigation from '../../../lib/navigation';
import {Inning} from '../../innings';

export interface HomeNavigator {
  showInningEnd: (inning: Inning) => Promise<string>;
}

const createHomeNavigator = (): HomeNavigator => {
  return {
    showInningEnd: (inning: Inning) => AppNavigation.showModal('MatchResult', {inning}),
  };
};

export default createHomeNavigator;
