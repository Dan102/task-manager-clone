import axios from 'axios';
import { Store } from 'redux';
import { StoreState } from '../../store/store';

const authRequestInterceptor = (store: Store<StoreState>) => {
  axios.interceptors.request.use((req) => {
    req.headers['Accept'] = 'application/json';
    req.headers['Content-Type'] = 'application/json';
    req.headers.common['Authorization'] = 'bearer ' + store.getState().auth.loggedUser?.token;
    return req;
  });
};

export default authRequestInterceptor;
