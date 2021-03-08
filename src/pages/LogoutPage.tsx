import * as React from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Wrapper from '../components/App/Wrapper/Wrapper';
import ActionButton from '../components/ActionButton/ActionButton';
import { userActions } from '../store/user/reducer/userReducer';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      width: 100,
      height: 100,
      backgroundImage: 'url(./assets/images/logout-big.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      paddingTop: 230,
      margin: '0 auto',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 40,
    },
    text: {
      fontSize: 16,
    },
    button: {
      width: '70%',
      marginTop: 200,
    },
  }),
);

const LogoutPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const onButtonClick = () => {
    dispatch(userActions.logout());
    history.replace('');
  };

  return (
    <Wrapper actionBarHeader="Разлагініцца" settingsElementMode>
      <Box textAlign="center" style={{ height: 'calc(100vh - 64px)' }}>
        <div className={classes.icon} />
        <p className={classes.header}>Дзякуй, што былі з намі!</p>
        <p className={classes.text}>Вы дакладна хочаце разлагініцца?</p>
        <ActionButton
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          onClick={onButtonClick}
        >
          Разлагініцца
        </ActionButton>
      </Box>
    </Wrapper>
  );
};

export default LogoutPage;
