import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { Box, createStyles, Link, makeStyles, Typography } from '@material-ui/core';
import { RootState } from '../store/rootReducer';
import { Page } from '../constants/paths';
import Wrapper from '../components/App/Wrapper/Wrapper';
import SignUpForm from '../components/SignUpForm/SignUpForm';

const useStyles = makeStyles(() =>
  createStyles({
    authText: {
      fontStyle: 'italic',
    },
    link: {
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
    headerContainer: {
      textAlign: 'center',
      padding: '2% 0 1%',
    },
    header: {
      fontSize: '30px',
    },
  }),
);

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (currentUser) {
    return <Redirect to={Page.Home} />;
  }

  return (
    <Wrapper background="background4">
      <div className={classes.headerContainer}>
        <Link component={NavLink} to={Page.Home}>
          <img src="./assets/images/logo.png" alt="app-logo" />
        </Link>
        <h2 className={classes.header}>Шчыра вітаем!</h2>
      </div>
      <Box p={3}>
        <SignUpForm />
        <Box pl={6} pr={6} mt={2} display="flex" justifyContent="center">
          <Typography variant="body1" className={classes.authText}>
            Ужо ёсць акаунт?{' '}
            <Link
              color="textPrimary"
              underline="always"
              className={classes.link}
              component={NavLink}
              to={Page.Login}
            >
              Залагініцца
            </Link>
          </Typography>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default SignUpPage;
