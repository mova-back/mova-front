import { Theme, ThemeOptions } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';

export type Sizes = {
  [key in 'xl' | 'l' | 'm' | 's' | 'xs']: string;
};

export type Colors = {
  [key in
    | 'button'
    | 'buttonDisabled'
    | 'buttonOpacity10'
    | 'error'
    | 'errorOpacity10'
    | 'text'
    | 'textOpacity80'
    | 'textOpacity45'
    | 'textOpacity10'
    | 'primary'
    | 'backgroundColor'
    | 'primaryLight'
    | 'borderOpacity10']: string;
};

interface CustomPalette extends Palette {
  gradient: {
    main: string;
  };
  header: {
    lg: string;
  };
}

export interface CustomTheme extends Theme {
  palette: CustomPalette;
  custom: {
    colors: Colors;
    sizes: Sizes;
  };
}

export interface CustomThemeOptions extends ThemeOptions {
  palette: CustomPalette;
  custom: {
    colors: Colors;
    sizes: Sizes;
  };
}
