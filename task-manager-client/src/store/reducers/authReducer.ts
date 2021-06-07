import { Reducer } from 'redux';
import { AUTH_ACTIONS_TYPES, IAuthAction } from '../actions/authActions';
import { IAuthState } from '../models/IAuthState';

const initialAppSettings: IAuthState = {
  loggedUser: undefined,
};;

export const authReducer: Reducer<IAuthState, IAuthAction> = (
  state: IAuthState = initialAppSettings,
  action: IAuthAction,
): IAuthState => {
  switch (action.type) {
    case AUTH_ACTIONS_TYPES.LOGIN:
      return {
        loggedUser: action.payload,
      };
    case AUTH_ACTIONS_TYPES.LOGOUT:
      return {
        loggedUser: undefined,
      };
    default:
      return state;
  }
};
