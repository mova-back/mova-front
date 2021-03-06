import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Box, createStyles, makeStyles, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { AppStore } from '../store/rootReducer';
import { Page } from '../constants/paths';
import Wrapper from '../components/App/Wrapper/Wrapper';
import { CustomThemeOptions } from '../styles/types';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  const theme: CustomThemeOptions = useTheme();
  const useStyles = makeStyles(() =>
    createStyles({
      link: {
        fontWeight: 'bold',
      },
      headerContainer: {
        textAlign: 'center',
        padding: '2% 0 1%',
      },
      header: {
        fontSize: '30px',
      },
      headerText: {
        color: theme.custom.colors.textOpacity80,
        fontStyle: 'italic',
        fontSize: '16px',
      },
    })
  );

  const classes = useStyles({ theme });
  const currentUser = useSelector((state: AppStore) => state.user.currentUser);

  if (currentUser) {
    return <Redirect to={Page.Home} />;
  }

  return (
    <Wrapper background="background4">
      <div className={classes.headerContainer}>
        <Link component={NavLink} to={Page.Home}>
          <img src="./assets/images/logo.png" alt="app-logo" />
        </Link>
        <h2 className={classes.header}>Залагініцца</h2>
        <p className={classes.headerText}>
          Каб пачаць карыстацца слоўнікам, калі ласка, увайдзі ў свой акаунт.
          Пасля ты зможаш уносіць свае словы і ўзбагачаць нашу Родную мову!
        </p>
      </div>
      <Box p={3}>
        <LoginForm />
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
            to={Page.ForgetPassword}
          >
            Забыў пароль
          </Link>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default LoginPage;
