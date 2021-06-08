import DisplaySettings from '../../models/enums/DisplaySettings';
import SortSettings from '../../models/enums/SortSettings';

export const SETTINGS_ACTIONS_TYPES = {
  CHANGE_DETAIL_LEVEL: 'CHANGE_DETAIL_LEVEL',
  CHANGE_SORT_SETTINGS: 'CHANGE_SORT_SETTINGS',
  CHANGE_DISPLAY_SETTINGS: 'CHANGE_DISPLAY_SETTINGS',
};

export interface ISettingsAction {
  type: string;
  payload: number | SortSettings | DisplaySettings;
}

export const changeDetailLevelAction = (newDetailLevel: number): ISettingsAction => ({
  type: SETTINGS_ACTIONS_TYPES.CHANGE_DETAIL_LEVEL,
  payload: newDetailLevel,
});

export const changeSortSettingsAction = (newSortSettings: SortSettings): ISettingsAction => ({
  type: SETTINGS_ACTIONS_TYPES.CHANGE_SORT_SETTINGS,
  payload: newSortSettings,
});

export const changeDisplaySettingsAction = (newDisplaySettings: DisplaySettings): ISettingsAction => ({
  type: SETTINGS_ACTIONS_TYPES.CHANGE_DISPLAY_SETTINGS,
  payload: newDisplaySettings,
});