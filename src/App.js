import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import { useAuth } from './context/AuthContext';

function App() {

  const { isAuth, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  });

  return (
    <div className="App">
    <BrowserRouter>

      <Header />

      <Routes>
        <Route exact path="/" element={isAuth ?       <Post/> : <Signin />}></Route>
        <Route exact path="/signin" element={isAuth ? <Post/> : <Signin />}></Route>
        <Route exact path="/signup" element={isAuth ? <Post/> : <Signup />}></Route>
        <Route exact path="/post" element={isAuth ?   <Post/> : <Signin />}></Route>
      </Routes>

      <Footer/>

    </BrowserRouter>
    </div>
  );
}

export default App;
