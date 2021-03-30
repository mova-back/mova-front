import * as React from 'react';
import { useEffect } from 'react';

import { Box, createStyles, makeStyles, useTheme } from '@material-ui/core';
import { IProps } from './types';
import ActionBar from './ActionBar/ActionBar';
import { CustomThemeOptions } from '../../../styles/types';

const useStyles = makeStyles<CustomThemeOptions>((theme) =>
  createStyles({
    wrapper: {
      background: `${theme.palette.gradient.main}`,
      minHeight: 'calc(100vh - 112px)',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const Wrapper: React.FC<IProps> = ({ actionBarHeader, children }) => {
  const theme = useTheme<CustomThemeOptions>();
  const classes = useStyles(theme);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <ActionBar header={actionBarHeader} />
      <Box maxWidth={640} margin="auto" className={classes.wrapper}>
        {children}
      </Box>
    </>
  );
};

Wrapper.displayName = 'Wrapper';

export default Wrapper;
