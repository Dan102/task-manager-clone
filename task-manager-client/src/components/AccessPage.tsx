import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import login from '../api/requests/loginRequest';
import AuthHelper from '../helpers/authHelper';
import ILoggedUser from '../models/interfaces/ILoggedUser';
import { loginAction } from '../store/actions/authActions';
import { IApplicationState } from '../store/store';
import Login from './Login';
import Register from './Register';
import SpinnerPage from './SpinnerPage';

enum AccessPageMode {
  Login,
  Register
}

const AccessPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [status, setStatus] = useState<string>('');
  const loggedUser = useSelector<IApplicationState, ILoggedUser | undefined>((x) => x.auth.loggedUser);
  const [mode, setMode] = useState<AccessPageMode>(AccessPageMode.Login);
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const loginClick = (username: string, password: string) => {
    setIsLoading(true);
    login(username, password).then(
      (response) => {
        setIsLoading(false);
        if (response.status === 200) {
          localStorage.setItem('loggedUser', JSON.stringify(response.data));
          dispatch(loginAction(response.data));
        }
      },
      (error) => {
        setIsLoading(false);
        if (error?.response?.status === 400) {
          setStatus('Combination of password and username is invalid.');
        }
      }
    );
  };

  const RegisterClick = (username: string, password: string) => {
    // TODO: improve backend registration (connect entities to users)
  }

  return (
    <SpinnerPage
      isLoading={isLoading}
      component={
        <div className="login-page">
          <div className="login-container">
            <div>
              <button
                className="login-swap-button"
                onClick={() => {
                  if (mode === AccessPageMode.Login) setMode(AccessPageMode.Register);
                  else setMode(AccessPageMode.Login);
                }}>{mode === AccessPageMode.Login ? 'Register' : 'Login'}</button>
            </div>
            {mode === AccessPageMode.Login ?
              <Login loginClick={loginClick} status={status} /> :
              <Register registerClick={RegisterClick} status={status} />
            }
          </div>
        </div>
      }
    />
  );
};

export default AccessPage;
