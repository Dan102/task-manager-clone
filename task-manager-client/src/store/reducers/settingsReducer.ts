import { Reducer } from "redux"
import DisplaySettings from "../../models/enums/DisplaySettings"
import SortSettings from "../../models/enums/SortSettings"
import IAppSettings from "../models/IAppSettingsState";


const initialAppSettings: IAppSettings = {
    detailLevel: 3,
    sortSettings: SortSettings.Own,
    displaySettings: DisplaySettings.Kanban,
}

export interface ISettingsAction {
    type: string,
    payload: number | SortSettings | DisplaySettings,
}

export const SETTINGS_ACTIONS_TYPES = {
    CHANGE_DETAIL_LEVEL: "CHANGE_DETAIL_LEVEL",
    CHANGE_SORT_SETTINGS: "CHANGE_SORT_SETTINGS",
    CHANGE_DISPLAY_SETTINGS: "CHANGE_DISPLAY_SETTINGS",
}

export const changeDetailLevelAction = (newDetailLevel: number) => ({
    type: SETTINGS_ACTIONS_TYPES.CHANGE_DETAIL_LEVEL,
    payload: newDetailLevel
})

export const changeSortSettingsAction = (newSortSettings: SortSettings) => ({
    type: SETTINGS_ACTIONS_TYPES.CHANGE_SORT_SETTINGS,
    payload: newSortSettings
})

export const changeDisplaySettingsAction = (newDisplaySettings: DisplaySettings) => ({
    type: SETTINGS_ACTIONS_TYPES.CHANGE_DISPLAY_SETTINGS,
    payload: newDisplaySettings
})

export const settingsReducer: Reducer<IAppSettings, ISettingsAction> =
    (state: IAppSettings = initialAppSettings, action: ISettingsAction): IAppSettings => {
        switch (action.type) {
            case SETTINGS_ACTIONS_TYPES.CHANGE_DETAIL_LEVEL:
                return {
                    ...state,
                    detailLevel: action.payload
                };
            case SETTINGS_ACTIONS_TYPES.CHANGE_SORT_SETTINGS:
                return {
                    ...state,
                    sortSettings: action.payload
                };
            case SETTINGS_ACTIONS_TYPES.CHANGE_DISPLAY_SETTINGS:
                return {
                    ...state,
                    displaySettings: action.payload
                };
            default:
                return state;
        }
}