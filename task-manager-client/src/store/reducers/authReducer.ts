import { Reducer } from "redux"
import ILoggedUser from "../../models/interfaces/ILoggedUser";
import { IAuthState } from "../models/IAuthState";


const initialAppSettings: IAuthState = {
    loggedUser: undefined
};

export interface IAuthAction {
    type: string,
    payload: ILoggedUser | undefined,
}

export const AUTH_ACTIONS_TYPES = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
}

export const loginAction = (loggedUser: ILoggedUser) => ({
    type: AUTH_ACTIONS_TYPES.LOGIN,
    payload: loggedUser
})

export const logoutAction = () => ({
    type: AUTH_ACTIONS_TYPES.LOGOUT
})

export const authReducer: Reducer<IAuthState, IAuthAction> =
    (state: IAuthState = initialAppSettings, action: IAuthAction): IAuthState => {
        switch (action.type) {
            case AUTH_ACTIONS_TYPES.LOGIN:
                return {
                    loggedUser: action.payload
                }
            case AUTH_ACTIONS_TYPES.LOGOUT:
                return {
                    loggedUser: undefined
                };
            default:
                return state;
        }
}