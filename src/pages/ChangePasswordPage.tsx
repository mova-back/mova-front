import * as React from 'react';

import { Box, createStyles, makeStyles } from '@material-ui/core';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import Wrapper from '../components/App/Wrapper/Wrapper';
import BottomNav from '../components/App/BottomNav/BottomNav';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: '30px',
    },
  }),
);

const ChangePasswordPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Wrapper background="background5">
        <Box className={classes.root} p={3}>
          <ChangePassword />
        </Box>
      </Wrapper>
      <BottomNav />
    </>
  );
};

export default ChangePasswordPage;
