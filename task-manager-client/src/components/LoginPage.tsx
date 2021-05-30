import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import login from '../api/requests/loginRequest';
import AuthHelper from '../helpers/authHelper';
import ILoggedUser from '../models/interfaces/ILoggedUser';
import { loginAction } from '../store/reducers/authReducer';
import { IApplicationState } from '../store/store';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const loggedUser = useSelector<IApplicationState, ILoggedUser | undefined>((x) => x.auth.loggedUser);

  useEffect(() => {
    const loadedUser: ILoggedUser | undefined = AuthHelper.loadUserFromStorage();
    if (loadedUser) {
      console.log('Loading user from storage');
      dispatch(loginAction(loadedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser) {
      history.push('/');
    }
  }, [loggedUser, history]);

  const loginClick = () => {
    login(username, password).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
        dispatch(loginAction(response.data));
      } else if (response.status === 401) {
        setLoginStatus('Combination of password and username is invalid.');
      } else {
        setLoginStatus('Unexpected error during logging process.');
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-page-area">
          <span>Username:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="login-page-area">
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') loginClick();
            }}
          />
        </div>
        <button onClick={(e) => loginClick()}>Log in</button>
        <div className={loginStatus !== '' ? 'status-text-failure' : ''} style={{ width: '0px', minWidth: '100%' }}>
          {loginStatus}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
