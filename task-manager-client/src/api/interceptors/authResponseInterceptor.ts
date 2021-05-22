import axios from "axios";
import { Store } from "redux";
import { logoutAction } from "../../store/reducers/authReducer";
import { StoreState } from "../../store/store";

const authResponseInterceptor = (store: Store<StoreState>, history: any) => {

    axios.interceptors.response.use(
        res => res,
        err => {
            // Network error
            if (!err.status) {
                window.location.href = "/error";
            }
            else if (err?.response?.status === 401) {
                localStorage.clear();
                store.dispatch(logoutAction());
            }
        })
}

export default authResponseInterceptor;