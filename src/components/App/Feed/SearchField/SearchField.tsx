import * as React from 'react';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { CustomTheme, CustomThemeOptions } from '../../../../styles/types';

const SearchField: React.FC = () => {
  const useStyles = makeStyles<CustomTheme>((theme) =>
    createStyles({
      root: {
        borderRadius: '8px',
        boxShadow: '4px 12px 25px rgba(71, 55, 255, 0.08)',
        background: theme.custom.colors.primaryLight,
        width: '80%',
        marginLeft: 5,
      },

      container: {
        position: 'absolute',
        top: -50,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        left: 0,
      },
      button: {
        width: '20%',
        marginLeft: 15,
      },
    }),
  );
  const theme: CustomThemeOptions = useTheme();
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
