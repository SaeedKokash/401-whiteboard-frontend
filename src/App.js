import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import { useAuth } from './context/AuthContext';

function App() {

  const { userData } = useAuth();

  return (
    <div className="App">
    <BrowserRouter>

      <Header />

      <Routes>
        <Route exact path="/" element={userData.isAuth ?       <Post/> : <Signin />}></Route>
        <Route exact path="/signin" element={userData.isAuth ? <Post/> : <Signin />}></Route>
        <Route exact path="/signup" element={userData.isAuth ? <Post/> : <Signup />}></Route>
        <Route exact path="/post" element={userData.isAuth ?   <Post/> : <Signin />}></Route>
      </Routes>

      <Footer/>

    </BrowserRouter>
    </div>
  );
}

export default App;
