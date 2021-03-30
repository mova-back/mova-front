import { createMuiTheme } from '@material-ui/core/styles';
import mainTheme from './mainTheme/mainTheme';
import { CustomThemeOptions } from './types';

const theme = createMuiTheme((mainTheme as unknown) as CustomThemeOptions);

export default theme;
