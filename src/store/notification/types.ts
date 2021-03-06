import NotificationConfig from '../../models/notification';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION;
  payload: NotificationConfig;
}
