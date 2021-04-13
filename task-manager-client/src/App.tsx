
import axios from 'axios';
import { userInfo } from 'node:os';
import React, { useContext, useEffect } from 'react';
import {AuthContext, AuthProvider} from './contexts/AuthContext';
import './index.scss';
import IUser from './models/ILoggedUser';
import routes from './routes';

const App = () => {

  return (
    <React.StrictMode>
      <AuthProvider>
        {routes}
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App;