import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import cookies from 'react-cookies';
import Header from './components/Header';
import Footer from './components/Footer';

import AuthContextProvider from './context/AuthContext';
import { useAuth } from './context/AuthContext';



function App() {

  const { isAuth, setIsAuth, checkAuth } = useAuth();

  useEffect(() => {
    const token = cookies.load("token");
    if (token) {
      setIsAuth(true);
    }
  });

  return (
    <AuthContextProvider>
      
    <div className="App">
    <BrowserRouter>

      <Header />

      <Routes>

      <Route exact path="/" element={isAuth ?       <Post/> : <Signin checkAuth={checkAuth}/>}></Route>
      <Route exact path="/signin" element={isAuth ? <Post/> : <Signin checkAuth={checkAuth} />}></Route>
      <Route exact path="/signup" element={isAuth ? <Post/> : <Signup/> }></Route>
      <Route exact path="/post" element={isAuth ?   <Post/> : <Signin checkAuth={checkAuth} />}></Route>

      </Routes>

      <Footer/>

    </BrowserRouter>
    </div>
    </AuthContextProvider>
  );
}

export default App;
