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
      console.log("really loading")
      axios.defaults.headers.common['Authorization'] = 'bearer ' + authContext?.user?.token;
    }
  }, [authContext])

  useEffect(() => {
    console.log("changing authContext to: ", loadUserFromStorage())
    setAuthContext({
      user: loadUserFromStorage(),
      loginUser
    });
  }, [])

  function loadUserFromStorage(): IUser | undefined {
    if(localStorage["loggedUser"] != undefined) {
      return JSON.parse(localStorage["loggedUser"]);
    }
    return undefined;
  }

  function loginUser(data: IUser): void {
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