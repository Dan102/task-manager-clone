
import axios from 'axios';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import './index.scss';
import IAppSettings from './models/interfaces/IAppSettings';
import { authReducer, IAuthState } from './reducers/authReducer';
import { settingsReducer } from './reducers/settingsReducer';
import routes from './routes';

export interface IApplicationState {
    settings: IAppSettings,
    auth: IAuthState
}

const App = () => {

    const store = createStore(
        combineReducers<IApplicationState>({
            settings: settingsReducer,
            auth: authReducer
        })
    );

    useEffect(() => {
        axios.defaults.headers['Accept'] = 'application/json';
        axios.defaults.headers['Content-Type'] = 'application/json';
    }, [])

    return (
        <React.StrictMode>
            <Provider store={store}>
                {routes}
            </Provider>
        </React.StrictMode>
    )
}

export default App;