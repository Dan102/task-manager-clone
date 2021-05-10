import ILoggedUser from "../../models/interfaces/ILoggedUser";

export interface IAuthState {
    loggedUser: ILoggedUser | undefined;
}