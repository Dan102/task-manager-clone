import axios from 'axios';
import { Store } from 'redux';
import { logoutAction } from '../../store/reducers/authReducer';
import { StoreState } from '../../store/store';

const authResponseInterceptor = (store: Store<StoreState>, _history: any) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        localStorage.clear();
        store.dispatch(logoutAction());
        // Network error and not logged
      } else if (!err.status) {
        window.location.href = '/error';
      }
    },
  );
};

export default authResponseInterceptor;
