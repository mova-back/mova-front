import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Box, createStyles, IconButton, makeStyles } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import CurrentUser from './CurrentUser/CurrentUser';
import { AppStore } from '../../../../../store/rootReducer';
import { Page } from '../../../../../constants/paths';

const useStyles = makeStyles(() =>
  createStyles({
    action: {
      marginLeft: 'auto',
    },
  })
);

interface IProps {
  onAction: () => void;
}

const DrawerHeader: React.FC<IProps> = ({ onAction }) => {
  const { currentUser, fetching } = useSelector(
    (state: AppStore) => state.user
  );

  const classes = useStyles();

  const handleLoginClick = React.useCallback(() => {
    onAction();
  }, [onAction]);

  const handleLogout = React.useCallback(() => {
    onAction();
  }, [onAction]);

  return (
    <Box p={2} display="flex" justifyContent="space-around">
      {!fetching && !currentUser ? (
        <IconButton
          className={classes.action}
          edge="end"
          component={Link}
          to={Page.Login}
          onClick={handleLoginClick}
        >
          <LockOpenIcon />
        </IconButton>
      ) : (
        <CurrentUser
          user={currentUser}
          fetching={fetching}
          onLogoutClicked={handleLogout}
        />
      )}
    </Box>
  );
};

export default DrawerHeader;
