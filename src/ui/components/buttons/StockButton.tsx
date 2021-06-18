import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import StockButtonStyles from '../../styles/components/buttons/StockButton';

interface StockButtonProps extends TouchableOpacityProps {
  theme?: 'light' | 'dark';
  size?: 'large' | 'small';
  title: string;
}

type ThemeAction = [containerStyle: object, titleStyle: object];

const useTheme = (
  theme: StockButtonProps['theme'],
  size: StockButtonProps['size'],
): ThemeAction => {
  const sizeStyle = size === 'large' ? StockButtonStyles.largeSize : StockButtonStyles.smallSize;
  switch (theme) {
    case 'light':
      return [{...sizeStyle, ...StockButtonStyles.containerLight}, StockButtonStyles.titleLight];
    default:
      return [{...sizeStyle, ...StockButtonStyles.containerDark}, StockButtonStyles.titleDark];
  }
};

const StockButton: FunctionComponent<StockButtonProps> = props => {
  const {theme = 'dark', size = 'large', title} = props;
  const [containerStyle, titleStyle] = useTheme(theme, size);
  return (
    <TouchableOpacity {...props} style={[props.style, containerStyle]}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default StockButton;
