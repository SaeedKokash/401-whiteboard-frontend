import React from "react";
import Button from "react-bootstrap/Button";
import cookies from 'react-cookies';

import { useAuth } from '../context/AuthContext';




export default function Header() {

  const { isAuth, handleLogout } = useAuth();


    const userName = cookies.load('userName');

    return (
        <div className="App-header">
            <h1>Stress Relief Whiteboard App</h1>
            { isAuth ? 
            <div>
                <h3>Welcome {userName}</h3>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            : null }
        </div>
    )
}