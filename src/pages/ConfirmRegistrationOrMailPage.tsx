import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Box, createStyles, Link, makeStyles, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import { Page } from '../constants/paths';

import Wrapper from '../components/App/Wrapper/Wrapper';
import Tick from '../components/ThankYou/Tick';
import BottomNav from '../components/App/BottomNav/BottomNav';
import { RootState } from '../store/rootReducer';
import { userActions } from '../store/user/reducer/userReducer';
import Loader from '../components/Loader/Loader';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '130px 0 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    wrapperText: {
      margin: '31px 0 213px',
      maxWidth: '300px',
    },
    error: {
      fontStyle: 'italic',
    },
    link: {
      fontWeight: 'bold',
    },
    icon: {
      transform: 'scale(5)',
    },
  }),
);

const ConfirmRegistrationPage: React.FC = () => {
  const classes = useStyles();
  const isFetching = useSelector((state: RootState) => state.user.fetching);
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.user.email);
  const location = useLocation();
  const isError = useSelector((state: RootState) => state.user.isError);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailConfirmToken = searchParams.get('emailConfirmToken');
    dispatch(
      location.pathname === Page.ConfirmRegistration
        ? userActions.confirmRegistration(emailConfirmToken)
        : userActions.confirmChangeEmail(emailConfirmToken),
    );
  }, [dispatch, location]);

  return (
    <Wrapper background="background5">
      <Box className={classes.root}>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            <Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                {isError ? <ErrorIcon className={classes.icon} color="error" /> : <Tick />}
              </Box>
              <Typography className={classes.wrapperText} align="center">
                {isError ? (
                  <Typography>Something went wrong... Try again later</Typography>
                ) : (
                  <Typography>{email} is now confirmed, now you can login</Typography>
                )}
              </Typography>
            </Box>
            <Box>
              <Link
                color="textPrimary"
                underline="always"
                variant="body1"
                className={classes.link}
                component={NavLink}
                to={Page.Login}
              >
                Залагiнiцца
              </Link>
            </Box>
          </>
        )}
      </Box>
      <BottomNav />
    </Wrapper>
  );
};

export default ConfirmRegistrationPage;
