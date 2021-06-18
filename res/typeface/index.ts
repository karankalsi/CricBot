import {TextStyle} from 'react-native';
import palette from '../palette';

type AppFonts =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title'
  | 'meta'
  | 'metaBold'
  | 'action'
  | 'paragraph'
  | 'info'
  | 'infoBold';

const typeface: Record<AppFonts, TextStyle> = {
  h1: {
    fontSize: 32,
    color: palette.darkText,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 28,
    color: palette.darkText,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 24,
    color: palette.darkText,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 20,
    color: palette.darkText,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: palette.defaultText,
  },
  meta: {
    fontSize: 14,
    color: palette.defaultText,
  },
  metaBold: {
    fontSize: 16,
    color: palette.defaultText,
    fontWeight: 'bold',
  },
  action: {
    fontSize: 12,
    color: palette.defaultText,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
    color: palette.defaultText,
    textAlign: 'justify',
    lineHeight: 24,
  },
  info: {
    fontSize: 12,
    color: palette.defaultText,
  },
  infoBold: {
    fontSize: 12,
    fontWeight: '600',
  },
};

export default typeface;
