import * as React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
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
        left: '20%',
        width: '60%',
      },
    }),
  );
  const classes = useStyles({ theme });

  return (
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
  );
};

export default SearchField;
