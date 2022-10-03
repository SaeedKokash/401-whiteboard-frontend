// set a user in the context and change login status to true

import { createContext, useContext, useState } from "react";
import cookies from 'react-cookies';


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  let [isAuth, setIsAuth] = useState(false);

  const checkAuth = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("userName");
    cookies.remove("userId");
    cookies.remove("email");
    cookies.remove("role");
    setIsAuth(false);
    window.location.href = "/signin";
  };

  const value={ isAuth, setIsAuth, checkAuth, handleLogout }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
