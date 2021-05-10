import { StoreState } from './../../reducers/store';
import axios from "axios";
import { Store } from "redux";
import { logoutAction } from "../../reducers/authReducer";

const authRequestInterceptor = (store: Store<StoreState>) => {
    axios.interceptors.request.use(
        req => {
            req.headers['Accept'] = 'application/json';
            req.headers['Content-Type'] = 'application/json';
            req.headers.common['Authorization'] = 'bearer ' + store.getState().auth.loggedUser?.token;
            return req;
        }
    )
}

export default authRequestInterceptor;