import ILoggedUser from '../models/interfaces/ILoggedUser';

export default class StringHelper {
  public static getMaxLengthStringWithEllipsis(str: string, maxLength: number) {
    return str.length > maxLength && maxLength > '...'.length ?
      str.slice(0, maxLength - 3) + '...' :
      str;
  }
}
