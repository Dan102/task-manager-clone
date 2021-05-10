
import axios from 'axios';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import authRequestInterceptor from './api/interceptors/authRequestInterceptor';
import authResponseInterceptor from './api/interceptors/authResponseInterceptor';
import './index.scss';
import store from './reducers/store';
import routes from './routes';

const App = () => {

    useEffect(() => {
        authRequestInterceptor(store);
        authResponseInterceptor(store);
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