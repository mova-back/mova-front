import React from 'react';

import { Box, createStyles, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Link } from 'react-router-dom';
import User from '../../../../../../models/user';

interface IProps {
  user: User | null;
  fetching: boolean;
  onLogoutClicked: React.MouseEventHandler;
}

const CurrentUserPlaceholder: React.FC = () => {
  return (
    <div>
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="30%" />
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    action: {
      marginLeft: 'auto',
    },
  }),
);

const CurrentUser: React.FC<IProps> = ({ user, fetching, onLogoutClicked }) => {
  const classes = useStyles();

  return (
    <Box flex={1}>
      {fetching || !user ? (
        <CurrentUserPlaceholder />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div>
            <Typography variant="body2">{user.username}</Typography>
            {/* <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography> */}
          </div>
          <Link to="/logout">
            <IconButton
              color="secondary"
              className={classes.action}
              edge="end"
              onClick={onLogoutClicked}
            >
              <ExitToAppIcon />
            </IconButton>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default CurrentUser;
