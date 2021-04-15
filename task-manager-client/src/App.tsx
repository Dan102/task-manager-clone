
import axios from 'axios';
import { userInfo } from 'node:os';
import React, { useContext, useEffect } from 'react';
import {AuthContext, AuthProvider} from './contexts/AuthContext';
import './index.scss';
import IUser from './models/ILoggedUser';
import routes from './routes';

const App = () => {

  useEffect(() => {
    axios.defaults.headers['Accept'] = 'application/json';
    axios.defaults.headers['Content-Type'] = 'application/json';
  }, [])

  return (
    <React.StrictMode>
      <AuthProvider>
        {routes}
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App;