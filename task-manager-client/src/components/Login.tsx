import React, { useState } from 'react';

interface ILoginProps {
  status: string;
  loginClick: (username: string, password: string) => void;
}

const Login = ({status, loginClick}: ILoginProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h1>Log in</h1><div className="login-page-area">
        <span>Username:</span>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          } } />
      </div><div className="login-page-area">
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          } }
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              loginClick(username, password);
          } } />
      <div className={status !== '' ? 'status-text-failure' : ''} style={{ width: '0px', minWidth: '100%' }}>
        {status}
      </div>
      </div><button className="login-action-button" onClick={() => loginClick(username, password)}>Log in</button>
    </>
  );
};

export default Login;
