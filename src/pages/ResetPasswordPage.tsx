import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Box, createStyles, Link, makeStyles, useTheme } from '@material-ui/core';

import { Page } from '../constants/paths';

import Wrapper from '../components/App/Wrapper/Wrapper';
import { CustomThemeOptions } from '../styles/types';
import ResetPassword from '../components/App/ResetPassword/ResetPassword';
import BottomNav from '../components/App/BottomNav/BottomNav';
import ChangeEmail from '../components/App/ChangeEmail/ChangeEmail';

const ResetPage: React.FC = () => {
  const theme: CustomThemeOptions = useTheme();
  const useStyles = makeStyles(() =>
    createStyles({
      header: {
        color: theme.custom.colors.text,
        fontSize: '30px',
        margin: 20,
      },
      note: {
        color: theme.custom.colors.textOpacity80,
        fontStyle: 'italic',
        fontSize: '16px',
      },
      headerContainer: {
        textAlign: 'center',
        padding: '5% 0',
      },
      retryButton: {
        background: 'transparent',
        fontWeight: 'normal',
        textDecoration: 'underline',
        border: 'none',
        outline: 0,
        cursor: 'pointer',
      },
      submitButton: {
        width: '100%',
      },
      retryButtonText: {
        color: theme.custom.colors.text,
      },
      retryText: {
        textAlign: 'center',
        fontStyle: 'italic',
      },
      headerText: {
        color: theme.custom.colors.textOpacity80,
        fontStyle: 'italic',
        fontSize: '16px',
      },
      link: {
        fontWeight: 'normal',
      },
    }),
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetPasswordToken = searchParams.get('resetPasswordToken');
  const resetEmailToken = searchParams.get('resetEmailToken');
  // eslint-disable-next-line no-debugger
  debugger;
  const classes = useStyles();
  return (
    <Wrapper background="background4">
      <div className={classes.headerContainer}>
        <Link component={NavLink} to={Page.Home}>
          <img src="./assets/images/logo.png" alt="app-logo" />
        </Link>
        <h2 className={classes.header}>Змена {resetPasswordToken ? 'пароля' : 'пошты'}</h2>
        <p className={classes.headerText}>
          Засталося толькі ўвесці {resetPasswordToken ? 'новы пароль' : 'новую пошту'}
        </p>
      </div>
      <Box p={3}>
        <ResetPassword token={resetPasswordToken} />
        <Box pl={6} pr={6} mt={2} display="flex" justifyContent="space-between">
          <Link
            color="textPrimary"
            underline="always"
            variant="body1"
            className={classes.link}
            component={NavLink}
            to={Page.Signup}
          >
            Стварыць акаунт
          </Link>
          <Link
            color="textPrimary"
            underline="always"
            variant="body1"
            className={classes.link}
            component={NavLink}
            to={Page.Login}
          >
            Залагініцца
          </Link>
        </Box>
      </Box>
      <BottomNav />
    </Wrapper>
  );
};

export default ResetPage;
