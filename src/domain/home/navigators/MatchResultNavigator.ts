import AppNavigation from '../../../lib/navigation';

export interface MatchResultNavigator {
  dismiss: () => Promise<string>;
}

export const createMatchResultNavigator = (componentId: string): MatchResultNavigator => {
  return {
    dismiss: () => AppNavigation.dismissModal(componentId),
  };
};

export default createMatchResultNavigator;
