import { createStore, combineReducers } from 'redux';
import IAppSettings from './models/IAppSettingsState';
import { IAuthState } from './models/IAuthState';
import { authReducer } from './reducers/authReducer';
import { settingsReducer } from './reducers/settingsReducer';

export interface IApplicationState {
  settings: IAppSettings;
  auth: IAuthState;
}

const store = createStore(
  combineReducers<IApplicationState>({
    settings: settingsReducer,
    auth: authReducer,
  }),
);

export type StoreState = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;

export default store;
