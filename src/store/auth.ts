import { InferActionsTypes } from './types';

type UserStore = {
  accessTokenExpDate: number;
};
const initialState: UserStore = {
  accessTokenExpDate: 0,
};
export const SET_TOKEN_EXP_DATE = 'SET_TOKEN_EXP_DATE';

export type UserActionsType = InferActionsTypes<typeof tokenActions>;

const tokenReducer = (
  state: UserStore = initialState,
  action: UserActionsType
): UserStore => {
  switch (action.type) {
    case SET_TOKEN_EXP_DATE:
      return {
        ...state,
        accessTokenExpDate: action.payload,
      };
    default:
      return state;
  }
};

export const tokenActions = {
  setExpDate: (expDate: number) =>
    ({
      type: SET_TOKEN_EXP_DATE,
      payload: expDate,
    } as const),
};

export default tokenReducer;
