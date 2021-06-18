import {StyleSheet} from 'react-native';
import palette from '../../../../../res/palette';
import typeface from '../../../../../res/typeface';

const MatchResultStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 80,
    justifyContent: 'space-between',
  },
  title: {
    ...typeface.h1,
    alignSelf: 'center',
    color: palette.whiteText,
  },
  message: {
    ...typeface.infoBold,
    fontSize: 18,
    alignSelf: 'center',
    color: palette.whiteText,
  },
});

export default MatchResultStyles;
