
import axios from 'axios';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import authRequestInterceptor from './api/interceptors/authRequestInterceptor';
import authResponseInterceptor from './api/interceptors/authResponseInterceptor';
import './index.scss';
import routes from './routes';
import store from './store/store';

const App = () => {

    const history = useHistory();

    useEffect(() => {
        authRequestInterceptor(store);
        authResponseInterceptor(store, history);
    }, [])

    return (
        <Provider store={store}>
            {routes}
        </Provider>
    )
}

export default App;