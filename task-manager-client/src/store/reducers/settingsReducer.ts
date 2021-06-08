import { Reducer } from 'redux';
import DisplaySettings from '../../models/enums/DisplaySettings';
import SortSettings from '../../models/enums/SortSettings';
import { ISettingsAction, SETTINGS_ACTIONS_TYPES } from '../actions/settingsActions';
import IAppSettings from '../models/IAppSettingsState';

const initialAppSettings: IAppSettings = {
  detailLevel: 3,
  sortSettings: SortSettings.Own,
  displaySettings: DisplaySettings.Table,
};


export const settingsReducer: Reducer<IAppSettings, ISettingsAction> = (
  state: IAppSettings = initialAppSettings,
  action: ISettingsAction,
): IAppSettings => {
  switch (action.type) {
    case SETTINGS_ACTIONS_TYPES.CHANGE_DETAIL_LEVEL:
      return {
        ...state,
        detailLevel: action.payload,
      };
    case SETTINGS_ACTIONS_TYPES.CHANGE_SORT_SETTINGS:
      return {
        ...state,
        sortSettings: action.payload,
      };
    case SETTINGS_ACTIONS_TYPES.CHANGE_DISPLAY_SETTINGS:
      return {
        ...state,
        displaySettings: action.payload,
      };
    default:
      return state;
  }
};
