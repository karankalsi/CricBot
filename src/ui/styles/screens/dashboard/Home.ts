import {StyleSheet} from 'react-native';
import palette from '../../../../../res/palette';
import typeface from '../../../../../res/typeface';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  scoreCard: {
    width: 140,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: palette.backgroundLight,
    borderRadius: 5,
    shadowColor: palette.shadow,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  scoreCardText: {
    ...typeface.meta,
    paddingVertical: 5,
  },
  scoreCardLabelText: {
    ...typeface.meta,
    color: palette.greyText,
    paddingVertical: 5,
  },
  pitch: {
    width: 180,
    height: 300,
    backgroundColor: palette.backgroundLight,
    borderRadius: 5,
    paddingVertical: 12,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pitchText: {
    ...typeface.meta,
  },
  flashScoreText: {
    ...typeface.meta,
    color: palette.whiteText,
    fontSize: 100,
    includeFontPadding: false,
    paddingVertical: 0,
    textAlign: 'center',
    position: 'absolute',
    top: 100,
    right: 25,
  },
  flashScoreHintText: {
    fontSize: 20,
    lineHeight: 20,
    color: palette.whiteText,
  },
});

export default HomeStyles;
