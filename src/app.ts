import Navigation from './lib/navigation';
import {AppScreen, registerScreens, setDefaultOptions} from './ui/screens';

const startApp = async () => {
  registerScreens();
  setDefaultOptions();
  Navigation.events().registerAppLaunchedListener(onLaunch);
};

const onLaunch = async (): Promise<void> => {
  setRoot('Home');
};

const setRoot = (screen: AppScreen) => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screen,
            },
          },
        ],
      },
    },
  });
};

export {startApp};
