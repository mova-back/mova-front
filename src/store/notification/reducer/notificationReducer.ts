import NotificationTypes from '../../../constants/notificationTypes';
import NotificationConfig from '../../../models/notification';
import { InferActionsTypes } from '../../types';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

type NotificationStore = {
  readonly visible: boolean;
  readonly config: NotificationConfig;
};
const initialState: NotificationStore = {
  visible: false,
  config: {
    type: NotificationTypes.success,
    message: '',
  },
};

export type NotificationActionsTypes = InferActionsTypes<typeof notificationActions>;
const notificationReducer = (
  state = initialState,
  action: NotificationActionsTypes,
): NotificationStore => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        visible: true,
        config: { ...action.payload },
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};

export const notificationActions = {
  addNotification: (config: NotificationConfig) =>
    ({
      type: ADD_NOTIFICATION,
      payload: config,
    } as const),
  showNotification: (config: NotificationConfig) =>
    ({
      type: SHOW_NOTIFICATION,
      payload: config,
    } as const),

  dismissNotification: () =>
    ({
      type: DISMISS_NOTIFICATION,
    } as const),

  hideNotification: () =>
    ({
      type: HIDE_NOTIFICATION,
    } as const),

  removeNotification: () =>
    ({
      type: REMOVE_NOTIFICATION,
    } as const),
};

export default notificationReducer;
