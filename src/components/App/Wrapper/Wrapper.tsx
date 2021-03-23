import * as React from 'react';
import { useEffect } from 'react';

import { Box, createStyles, makeStyles } from '@material-ui/core';
import { IProps } from './types';
import ActionBar from './ActionBar/ActionBar';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      background: 'linear-gradient(180deg, rgba(239,237,255,1) 0%, rgba(255,255,255,1) 60%)',
      minHeight: 'calc(100vh - 112px)',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const Wrapper: React.FC<IProps> = ({ actionBarHeader, children }) => {
  const classes = useStyles();
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
