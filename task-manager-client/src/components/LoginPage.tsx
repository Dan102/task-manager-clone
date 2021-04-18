import axios from "axios";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import login from "../api/requests/loginRequest";
import AuthHelper from "../helpers/authHelper";
import ILoggedUser from "../models/interfaces/ILoggedUser";
import { loginAction } from "../reducers/authReducer";

const LoginPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    useEffect(() => {
        const loadedUser: ILoggedUser | undefined = AuthHelper.loadUserFromStorage();
        if (loadedUser) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loadedUser.token;
            dispatch(loginAction(loadedUser));
        }
    }, [])

    const loginClick = () => {
        login(username, password).then(response => {
            if(response.status === 200) {
                localStorage.setItem("loggedUser", JSON.stringify(response.data));
                axios.defaults.headers.common['Authorization'] = 'bearer ' + response.data.token;
                dispatch(loginAction(response.data));
                history.push("/");
            } else if(response.status === 401) {
                setLoginStatus("Combination of password and username is invalid.");
            } else {
                setLoginStatus("Unexpected error during logging proccess.");
            }
        })
    }

    return (
        <div className="login-page">
            <div className="login-container">
            <h1>Login</h1>
            <div className="login-page-area">
                <span>Username:</span>
                <input type="text" value={username}
                onChange={(e) => {setUsername(e.target.value)}}/>
            </div>
            <div className="login-page-area">
                <span>Password:</span>
                <input type="password" value={password}
                onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <button onClick={e => loginClick()}>Log in</button>
            <div className={loginStatus !== "" ? "status-text-failure" : ""} style={{width: "0px", minWidth: "100%"}}>
                {loginStatus}
            </div>
            </div>
        </div>
    )
}

export default LoginPage