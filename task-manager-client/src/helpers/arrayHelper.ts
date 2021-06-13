export default class ArrayHelper {

  public static getRange (start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

}
