import DisplaySettings from '../../models/enums/DisplaySettings';
import SortSettings from '../../models/enums/SortSettings';

export default interface IAppSettingsState {
  detailLevel: number;
  sortSettings: SortSettings;
  displaySettings: DisplaySettings;
}
