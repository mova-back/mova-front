import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { RootState } from '../../../store/rootReducer';
import { notificationActions } from '../../../store/notification/reducer/notificationReducer';

const SnackbarContainer: React.FC = () => {
  const { config, visible } = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  const handleNotificationClose = React.useCallback(() => {
    dispatch(notificationActions.dismissNotification());
  }, [dispatch]);

  const handleNotificationExited = React.useCallback(() => {
    dispatch(notificationActions.removeNotification());
  }, [dispatch]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={visible}
      autoHideDuration={6000}
      onClose={handleNotificationClose}
      onExited={handleNotificationExited}
      message={config.message}
    />
  );
};

export default SnackbarContainer;
