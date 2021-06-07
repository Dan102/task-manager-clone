import axios from 'axios';
import { Store } from 'redux';
import { logoutAction } from '../../store/actions/authActions';
import { StoreState } from '../../store/store';

const authResponseInterceptor = (store: Store<StoreState>, history: any): void => {
  axios.interceptors.response.use(
    (res: any) => res,
    (err: any) => {
      const shouldNotBeIncluded = [
        // bad request from login page
        (err?.response?.status === 400) && err?.response?.config?.url?.endsWith("login")
      ]
      if (err?.response?.status === 401) {
        localStorage.clear();
        store.dispatch(logoutAction());
        // Network error and not logged
      } else if (!err.status && !shouldNotBeIncluded.some(x => x)) {
        window.location.href = '/error';
      }
      throw err;
    },
  );
};

export default authResponseInterceptor;
