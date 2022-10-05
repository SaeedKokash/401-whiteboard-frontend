import { createContext, useContext, useState } from "react";
import cookies from 'react-cookies';
import base64 from "base-64";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {

  const [isAuth, setIsAuth] = useState(false);
  const [isNotLogged, setIsNotLogged] = useState(false);
  const [isPassword, setisPassword] = useState(false);

  const user = {
    username: cookies.load('userName'),
    role: cookies.load('role'),
    email: cookies.load('email'),
    token: cookies.load('token'),
    userId: cookies.load('userId'),
  };

  const checkAuth = async () => {
    // const token = cookies.load("token");
    if (user.token) {
      setIsAuth(true);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
      if (e.target.password.value === e.target.confirmPassword.value) {
        const data = {
          userName: e.target.userName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          role: e.target.role.value,
        };
        console.log(data)
        await axios
          .post(`${process.env.REACT_APP_HEROKU_URL}/signup`, data)
          .then((res) => {
            console.log(res)
            window.location.href = '/signin'; })
          .catch((error) => console.log(error));
      } else {
        setisPassword(true)
        console.log('password dont match')
      }
       
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const user = {
      userName: e.target.userName.value,
      password: e.target.password.value,
    };
    const encoded = base64.encode(`${user.userName}:${user.password}`);
    await axios
      .post(`${process.env.REACT_APP_HEROKU_URL}/signin`, {},
        {
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.user) 
        cookies.save('token', res.data.token);
        cookies.save('userName', res.data.user.username);
        cookies.save('userId', res.data.user.id);
        cookies.save('email', res.data.user.email);
        cookies.save('role', res.data.user.role);
        checkAuth();
        window.location.href = '/post'
    })
      .catch((error) => 
      setIsNotLogged(true)
    );
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

  const value={ user, checkAuth, isAuth, setIsAuth, handleLogout, isNotLogged, handleSignin, isPassword, handleSignup };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
