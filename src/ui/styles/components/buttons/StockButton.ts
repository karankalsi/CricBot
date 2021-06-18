import {StyleSheet, TextProps, TouchableOpacityProps} from 'react-native';
import palette from '../../../../../res/palette';
import typeface from '../../../../../res/typeface';

const containerStyle: TouchableOpacityProps['style'] = {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: palette.backgroundDark,
};

const titleStyle: TextProps['style'] = {
  ...typeface.meta,
};

const StockButtonStyles = StyleSheet.create({
  containerLight: {
    ...containerStyle,
    backgroundColor: palette.backgroundLight,
  },
  containerDark: {
    ...containerStyle,
    backgroundColor: palette.backgroundDark,
  },
  titleDark: {
    ...titleStyle,
    color: palette.whiteText,
  },
  titleLight: {
    ...titleStyle,
    color: palette.defaultText,
  },
  largeSize: {height: 40},
  smallSize: {width: 100, height: 40},
});

export default StockButtonStyles;
