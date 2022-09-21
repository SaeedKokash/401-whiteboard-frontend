import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cookies from 'react-cookies';

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
    setIsAuth(false);
  }

  return (
    <div className="App">
    <BrowserRouter>
      <header className="App-header">
        <p>Welcome to Stress Relief Whiteboard App</p>
        <button onClick={handleLogout}>Logout</button>   
      </header>

      <Routes>

      {/* <Route exact path="/" element={isAuth ? <Post/> : <Navigate to="/signin" /> }/>
      <Route exact path="/signin" element={isAuth ? <Navigate to="/post" /> : <Signin checkAuth={checkAuth} />} />
      <Route exact path="/signup" element={isAuth ?<Navigate to="/post" /> : <Signup/> } />
      <Route exact path="/post" element={isAuth ? <Post/> :  <Navigate to="/signin" />} /> */}

      <Route exact path="/" element={isAuth ?       <Post/> : <Signin checkAuth={checkAuth}/>} />
      <Route exact path="/signin" element={isAuth ? <Post/> : <Signin checkAuth={checkAuth} />} />
      <Route exact path="/signup" element={isAuth ? <Post/> : <Signup/> } />
      <Route exact path="/post" element={isAuth ?   <Post/> : <Signin checkAuth={checkAuth} />} />

      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
