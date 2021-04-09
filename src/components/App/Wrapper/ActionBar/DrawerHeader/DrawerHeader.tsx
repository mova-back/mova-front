import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Box, Button, createStyles, IconButton, makeStyles } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import CurrentUser from './CurrentUser/CurrentUser';
import { RootState } from '../../../../../store/rootReducer';
import { Page } from '../../../../../constants/paths';

const useStyles = makeStyles(() =>
  createStyles({
    action: {
      marginLeft: 'auto',
      color: 'white',
    },
  }),
);

interface IProps {
  onAction: () => void;
}

const DrawerHeader: React.FC<IProps> = ({ onAction }) => {
  const { currentUser, fetching } = useSelector((state: RootState) => state.user);

  const classes = useStyles();

  const handleLoginClick = React.useCallback(() => {
    onAction();
  }, [onAction]);

  const handleLogout = React.useCallback(() => {
    onAction();
  }, [onAction]);

  return (
    <Box p={2} display="flex" justifyContent="space-around" alignItems="center">
      {!fetching && !currentUser ? (
        <Link className={classes.action} to={Page.Login} onClick={handleLoginClick}>
          Залагiнiцца
        </Link>
      ) : (
        <CurrentUser user={currentUser} fetching={fetching} onLogoutClicked={handleLogout} />
      )}
    </Box>
  );
};

export default DrawerHeader;
