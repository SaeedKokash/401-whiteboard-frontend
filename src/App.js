import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  let [isAuth, setIsAuth] = useState(false);

  const checkAuth = () => {
    setIsAuth(true);
  }

  useEffect(() => {
    const token = cookies.load('token');
    if(token) {
      setIsAuth(true)
    }
  }, []);

  const handleLogout = () => {
    cookies.remove('token');
    cookies.remove('userName');
    cookies.remove('userId');
    cookies.remove('email');
    cookies.remove('role');
    setIsAuth(false);
    window.location.href = '/signin'
  }

  return (
    <div className="App">
    <BrowserRouter>

      <Header handleLogout={handleLogout} isAuth={isAuth}/>

      <Routes>

      <Route exact path="/" element={isAuth ?       <Post/> : <Signin checkAuth={checkAuth}/>}></Route>
      <Route exact path="/signin" element={isAuth ? <Post/> : <Signin checkAuth={checkAuth} />}></Route>
      <Route exact path="/signup" element={isAuth ? <Post/> : <Signup/> }></Route>
      <Route exact path="/post" element={isAuth ?   <Post/> : <Signin checkAuth={checkAuth} />}></Route>

      </Routes>

      <Footer/>

    </BrowserRouter>
    </div>
  );
}

export default App;
