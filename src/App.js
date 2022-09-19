import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {

  let [isAuth, setIsAuth] = useState(false);

  const checkAuth = () => {
    setIsAuth(true);
  }

  // useEffect(() => {
  //   setIsAuth(true)
  // }, [])

  return (
    <div className="App">
    <BrowserRouter>
      <header className="App-header">
        <p>Welcome to Stress Relief Whiteboard App</p>   
      </header>

      <Routes>

      <Route path="/signup" element={isAuth ?<Navigate to="/post" /> : <Signup/> } />
      <Route path="/post" element={isAuth ? <Post/> :  <Navigate to="/signin" />} />
      <Route path="/signin" element={isAuth ? <Navigate to="/post" /> : <Signin checkAuth={checkAuth} />} />
      <Route path="/" element={isAuth ? <Post/> : <Navigate to="/signin" /> }/>

      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
