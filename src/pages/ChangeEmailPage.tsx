import * as React from 'react';

import { Box, createStyles, makeStyles } from '@material-ui/core';
import Wrapper from '../components/App/Wrapper/Wrapper';
import BottomNav from '../components/App/BottomNav/BottomNav';
import ChangeEmail from '../components/App/ChangeEmail/ChangeEmail';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: '100px',
    },
  }),
);

const ChangePasswordPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Wrapper background="background5">
        <Box className={classes.root} p={3}>
          <ChangeEmail />
        </Box>
      </Wrapper>
      <BottomNav />
    </>
  );
};

export default ChangePasswordPage;
