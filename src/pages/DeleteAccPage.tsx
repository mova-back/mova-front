import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { createStyles, makeStyles, Box, Link } from '@material-ui/core';
import { Page } from '../constants/paths';
import Wrapper from '../components/App/Wrapper/Wrapper';
import ActionButton from '../components/ActionButton/ActionButton';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      width: 100,
      height: 100,
      backgroundImage: 'url(./assets/images/bin-big.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      paddingTop: 230,
    },
    header: {
      fontSize: 20,
      fontWeight: 'normal',
      marginTop: 40,
    },
    text: {
      fontSize: 16,
    },
    button: {
      width: '70%',
      marginTop: 150,
    },
    link: {
      fontWeight: 'normal',
      marginTop: 25,
    },
  }),
);

const DeleteAccPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Wrapper actionBarHeader="Выдаліць акаунт" settingsElementMode>
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <div className={classes.icon} />
        <p className={classes.header}>Дзякуй, што былі з намі!</p>
        <span className={classes.text}>Вы дакладна хочаце выдаліць акаунт?</span>
        <ActionButton
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
        >
          Выдаліць акаунт
        </ActionButton>
        <Link
          color="textPrimary"
          underline="always"
          variant="body1"
          className={classes.link}
          component={NavLink}
          to={Page.Home}
        >
          Пакінуць водгук
        </Link>
      </Box>
    </Wrapper>
  );
};

export default DeleteAccPage;
