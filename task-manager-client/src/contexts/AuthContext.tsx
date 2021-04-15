import axios from "axios";
import React, { useEffect, useState } from "react"
import IUser from "../models/ILoggedUser";

export interface AuthContextProps {
  user: IUser | undefined,
  loginUser: (data: any) => void
}

const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  loginUser: (data: any) => {}
});

function AuthProvider({children}: any) {

  const [authContext, setAuthContext] = useState<AuthContextProps>({
    user: undefined,
    loginUser
  });

  useEffect(() => {
    if (authContext?.user?.token) {
      axios.defaults.headers.common['Authorization'] = 'bearer ' + authContext?.user?.token;
    }
  }, [authContext])

  useEffect(() => {
    const loadedUser: IUser | undefined = loadUserFromStorage();
    if (loadedUser) {
      loginUser(loadedUser);
    }
  }, [])

  function loadUserFromStorage(): IUser | undefined {
    if(localStorage["loggedUser"] != undefined) {
      return JSON.parse(localStorage["loggedUser"]);
    }
    return undefined;
  }

  function loginUser(data: IUser): void {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + loadUserFromStorage()?.token;
    setAuthContext({
      user: data,
      loginUser
    });
  }

  return (
    <AuthContext.Provider value={authContext}>
          {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };