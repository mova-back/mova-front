import LatoRegularWoff2 from '../../fonts/Lato-Regular.woff2';
import LatoBoldWoff2 from '../../fonts/Lato-Bold.woff2';
import LatoItalicWoff2 from '../../fonts/Lato-Italic.woff2';

const fonts = {
  latoRegular: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    src: `url(${LatoRegularWoff2}) format('woff2')`,
  },
  latoBold: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    src: `url(${LatoBoldWoff2}) format('woff2')`,
  },
  latoItalic: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontWeight: 400,
    src: `url(${LatoItalicWoff2}) format('woff2')`,
  },
};

export default fonts;
