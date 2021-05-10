import axios from "axios";
import { Store } from "redux";
import { logoutAction } from "../../reducers/authReducer";

const authResponseInterceptor = (store: Store) => {
    axios.interceptors.response.use(
        res => res,
        err => {
            if (err.response.status === 401) {
                localStorage.clear();
                store.dispatch(logoutAction());
            }
        })
}

export default authResponseInterceptor;