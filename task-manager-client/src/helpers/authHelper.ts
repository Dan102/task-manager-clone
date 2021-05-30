import ILoggedUser from '../models/interfaces/ILoggedUser';

export default class AuthHelper {
  public static loadUserFromStorage(): ILoggedUser | undefined {
    if (localStorage['loggedUser'] != null) {
      return JSON.parse(localStorage['loggedUser']);
    }
    return undefined;
  }
}
