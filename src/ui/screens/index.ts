import {Navigation, OptionsModalPresentationStyle} from 'react-native-navigation';
import palette from '../../../res/palette';
import typeface from '../../../res/typeface';
import Home from './dashboard/Home';
import MatchResult from './dashboard/MatchResult';

const screens = {
  Home: Home,
  MatchResult: MatchResult,
};

export type AppScreen = keyof typeof screens;

export const registerScreens = (): void => {
  Object.keys(screens).forEach(key =>
    Navigation.registerComponent(key, () => screens[key as AppScreen]),
  );
};

export const screenName = (screen: AppScreen): string => {
  return screen as string;
};

export const setDefaultOptions = (): void =>
  Navigation.setDefaultOptions({
    window: {
      backgroundColor: palette.backgroundLight,
    },
    statusBar: {
      backgroundColor: palette.backgroundLight,
      style: 'dark',
    },
    topBar: {
      visible: false,
      background: {
        color: palette.backgroundLight,
      },
      backButton: {
        color: palette.accent,
        showTitle: false,
      },
      title: {
        ...(typeface.title as {}),
      },
    },
    layout: {
      componentBackgroundColor: palette.backgroundLight,
      orientation: ['portrait'],
      direction: 'locale',
    },
    modalPresentationStyle: OptionsModalPresentationStyle.fullScreen,
  });

export default screens;
