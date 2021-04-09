import LatoThin from '../../fonts/Lato-Thin.ttf';
import LatoLight from '../../fonts/Lato-Light.ttf';
import LatoRegular from '../../fonts/Lato-Regular.ttf';
import LatoBold from '../../fonts/Lato-Bold.ttf';
import LatoBlack from '../../fonts/Lato-Black.ttf';
import LatoItalic from '../../fonts/Lato-Italic.ttf';

const fonts = {
  latoThin: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 100,
    src: `url(${LatoThin}) format('ttf')`,
  },
  latoLight: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 300,
    src: `url(${LatoLight}) format('ttf')`,
  },
  latoRegular: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    src: `url(${LatoRegular}) format('ttf')`,
  },
  latoBold: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    src: `url(${LatoBold}) format('ttf')`,
  },
  latoBlack: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    src: `url(${LatoBlack}) format('ttf')`,
  },
  latoItalic: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontWeight: 400,
    src: `url(${LatoItalic}) format('woff2')`,
  },
};

export default fonts;
