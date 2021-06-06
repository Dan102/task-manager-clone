import React, { useState } from 'react';

interface IRegisterProps {
  status: string;
  registerClick: (username: string, password: string) => void;
}

const Register = ({status, registerClick}: IRegisterProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div style={
        {
          fontStyle: 'italic',
          height: '200px',
          width: '200px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 'bold'
        }}>COMING SOON</div>
      {/* TODO: backend registration
      <h1>Register</h1><div className="login-page-area">
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
              registerClick(username, password);
          } } />
      </div><button className="login-action-button" onClick={() => registerClick(username, password)}>Register</button>
      <div className={status !== '' ? 'status-text-failure' : ''} style={{ width: '0px', minWidth: '100%' }}>
        {status}
      </div> */}
    </>
  );
};

export default Register;
