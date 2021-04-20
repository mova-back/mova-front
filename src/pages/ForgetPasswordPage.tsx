import * as React from 'react';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles, createStyles, Box, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { CustomThemeOptions } from '../styles/types';
import Wrapper from '../components/App/Wrapper/Wrapper';

import { Page } from '../constants/paths';

import ForgetPassword from '../components/ForgetPassword/ForgetPassword';

const ForgetPasswordPage: React.FC = () => {
  // const [query, setQuery] = React.useState('');
  const theme: CustomThemeOptions = useTheme();
  const useStyles = makeStyles(() =>
    createStyles({
      header: {
        color: theme.custom.colors.text,
        fontSize: '30px',
      },
      note: {
        color: theme.custom.colors.textOpacity80,
        fontStyle: 'italic',
        fontSize: '16px',
      },
      headerContainer: {
        textAlign: 'center',
        padding: '20px 0',
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
      link: {
        fontWeight: 'normal',
      },
      formContainer: {
        padding: 25,
      },
    }),
  );
  const classes = useStyles();

  return (
    <Wrapper background="background4">
      <div className={classes.headerContainer}>
        <Link component={NavLink} to={Page.Home}>
          <img src="./assets/images/logo.png" alt="app-logo" />
        </Link>
        <h2 className={classes.header}>Забыўся пароль?</h2>
        <p className={classes.note}>Калі ласка, укажы пошту, якую ты пазначыў пры рэгістрацыі</p>
      </div>
      <Box p={3}>
        <ForgetPassword />
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
    </Wrapper>
  );
};

export default ForgetPasswordPage;
