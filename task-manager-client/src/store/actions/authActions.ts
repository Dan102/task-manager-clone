import ILoggedUser from '../../models/interfaces/ILoggedUser';

export const AUTH_ACTIONS_TYPES = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export interface IAuthAction {
  type: string;
  payload?: ILoggedUser | undefined;
}

export const loginAction = (loggedUser: ILoggedUser): IAuthAction => ({
  type: AUTH_ACTIONS_TYPES.LOGIN,
  payload: loggedUser,
});

export const logoutAction = (): IAuthAction => ({
  type: AUTH_ACTIONS_TYPES.LOGOUT,
});