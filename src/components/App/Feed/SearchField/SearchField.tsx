import * as React from 'react';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { CustomThemeOptions } from '../../../../styles/types';

const SearchField: React.FC = () => {
  const theme: CustomThemeOptions = useTheme();
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        borderRadius: '8px',
        boxShadow: '4px 12px 25px rgba(71, 55, 255, 0.08)',
        background: theme.custom.colors.primaryLight,
        width: '100%',
        marginRight: 15,
        flexShrink: 1,
      },

      container: {
        position: 'absolute',
        top: -30,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'center',
        width: 'calc(100% - 16px)',
      },
      button: {
        flexBasis: 200,
        flexShrink: 0,
      },
    }),
  );
  const classes = useStyles({ theme });

  return (
    <div className={classes.container}>
      <TextField
        id="search"
        className={classes.root}
        placeholder="Пошук слоў"
        type="search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button className={classes.button} color="secondary" variant="contained">
        Знайсцi
      </Button>
    </div>
  );
};

export default SearchField;
