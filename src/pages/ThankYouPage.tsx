import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, createStyles, Link, makeStyles, Typography } from '@material-ui/core';

import { Page } from '../constants/paths';

import Wrapper from '../components/App/Wrapper/Wrapper';
import ThankYou from '../components/ThankYou/ThankYou';

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
  }),
);

const ThankYoupage: React.FC = () => {
  const classes = useStyles();

  return (
    <Wrapper background="background5">
      <Box className={classes.root}>
        <Box>
          <ThankYou title="Дзякуй!" />
          <Typography className={classes.wrapperText} align="center">
            Для таго, каб пацвердзіць рэгістрацыю, перайдзі па спасылцы, што прыйшла на пошту, якую
            ты ўказаў пры рэгістрацыі
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.error}>Нічога не прыйшло?</Typography>
          <Link
            color="textPrimary"
            underline="always"
            variant="body1"
            className={classes.link}
            component={NavLink}
            to={Page.Signup}
          >
            Адправіць яшчэ раз
          </Link>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default ThankYoupage;
