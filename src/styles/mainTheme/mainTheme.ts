import { colors, sizes } from './variables';

const mainTheme = {
  palette: {
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
    },
    secondary: {
      main: colors.button,
      light: colors.buttonOpacity10,
    },
    error: {
      main: colors.error,
    },
    text: {
      primary: colors.text,
      secondary: colors.textOpacity80,
    },
    gradient: {
      main: `linear-gradient(180deg, ${colors.backgroundColor}  0%, ${colors.primaryLight} 60%)`,
    },
    header: {
      lg: 'rgb(56,79,125)',
    },
  },
  typography: {
    fontFamily: ['Roboto'].join(','),
    fontWeightLight: 'normal',
    fontWeightRegular: 'normal',
    fontWeightMedium: 'normal',
  },
  shape: {
    borderRadius: 8,
  },
  custom: {
    colors,
    sizes,
  },
  overrides: {
    MuiCardContent: {
      root: {
        padding: '10px',
        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
    MuiCardActions: {
      root: {
        padding: 5,
      },
    },
    MuiButton: {
      containedSecondary: {
        color: 'white',
      },
      text: { padding: 0 },
    },
    MuiToggleButton: {},
    MuiCssBaseline: {
      '@global': {
        '@font-face': [],
      },
    },
    MuiBottomNavigation: {
      root: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        boxShadow: '0px -3px 35px rgba(126, 151, 168, 0.16)',
      },
    },
    MuiBottomNavigationAction: {
      root: {
        opacity: 0.45,
        transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        '&$selected': {
          color: undefined,
          opacity: 1,
        },
      },
      label: {
        '&$selected': {
          fontSize: '0.75rem',
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: 320,
      },
    },
    MuiSwitch: {
      switchBase: {
        padding: 1,
        '&$checked': {
          transform: 'translateX(16px)',
          '& + $track': {
            backgroundColor: ' #34C759',
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
        color: colors.primaryLight,
      },
      track: {
        borderRadius: 26 / 2,
        backgroundColor: 'grey',
        opacity: 1,
      },
    },
    MuiRadio: {
      root: {
        color: colors.text,
      },
    },
  },
};

export default mainTheme;
