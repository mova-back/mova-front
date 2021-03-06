import { ThemeOptions } from '@material-ui/core';

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

export interface CustomThemeOptions extends ThemeOptions {
  custom: {
    colors: Colors;
    sizes: Sizes;
  };
}
