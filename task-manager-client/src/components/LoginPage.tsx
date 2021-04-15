import axios from "axios";
import React, { useContext, useState } from "react"
import { useHistory } from "react-router";
import { APP_SETTINGS } from "../app-settings";
import { AuthContext } from "../contexts/AuthContext";
import IUser from "../models/ILoggedUser";

const LoginPage = () => {

  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const loginClick = () => {
    return axios.post(APP_SETTINGS.loginUrl, {
        username,
        password
    }).then(response => {
        if(response.status === 200) {
            localStorage.setItem("loggedUser", JSON.stringify(response.data));
            authContext.loginUser(response.data);
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