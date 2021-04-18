import DisplaySettings from "../enums/DisplaySettings";
import SortSettings from "../enums/SortSettings";

export default interface IAppSettings {
    detailLevel: number;
    sortSettings: SortSettings;
    displaySettings: DisplaySettings;
}