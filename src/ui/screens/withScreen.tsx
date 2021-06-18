import React from 'react';
import {
  Navigation,
  NavigationComponentProps,
  NavigationFunctionComponent,
  Options,
} from 'react-native-navigation';
import palette from '../../../res/palette';
import {ViewModel, ViewModelHook} from '../../domain/ViewModel';

export type ScreenComponent<P> = React.ComponentType<P>;

export interface ViewModelProps<VM> {
  viewModel: VM;
}

export type ScreenProps<VM extends ViewModel> = NavigationComponentProps & ViewModelProps<VM>;

export enum ScreenTheme {
  DARK,
  LIGHT,
}

export interface ScreenOptions {
  theme?: ScreenTheme;
  autoRotate?: boolean;
  landscape?: boolean;
}

const generateScreenStyle = (options?: ScreenOptions): Options => {
  const themeColor =
    options?.theme === ScreenTheme.DARK ? palette.backgroundDark : palette.backgroundLight;

  return {
    window: {
      backgroundColor: themeColor,
    },
    layout: {
      componentBackgroundColor: themeColor,
      orientation: options?.autoRotate
        ? ['portrait', 'landscape']
        : [options?.landscape ? 'landscape' : 'portrait'],
    },
    statusBar: {
      backgroundColor: palette.transparent,
    },
  };
};

const useScreenStyle = (componentId: string, options?: ScreenOptions): void => {
  React.useEffect(() => {
    Navigation.mergeOptions(componentId, generateScreenStyle(options));
  }, [componentId, options]);
};

export const withScreen = <P extends ScreenProps<VM>, VM extends ViewModel>(
  WrappedComponent: ScreenComponent<P>,
  useViewModel: ViewModelHook<P>,
  options?: ScreenOptions,
): React.ComponentType<P> => {
  const ScreenHOC: NavigationFunctionComponent<P> = props => {
    const viewModel = useViewModel(props);
    useScreenStyle(props.componentId, options);
    return (
      <>
        <WrappedComponent {...props} viewModel={viewModel} />
      </>
    );
  };
  ScreenHOC;
  return ScreenHOC;
};

export const withPureScreen = <P extends ScreenProps<VM>, VM extends ViewModel>(
  WrappedComponent: ScreenComponent<P>,
  useViewModel: ViewModelHook<P>,
  options?: ScreenOptions,
): React.ComponentType<P> => {
  return React.memo(withScreen(WrappedComponent, useViewModel, options));
};
