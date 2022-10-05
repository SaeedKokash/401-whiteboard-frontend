import React from "react";
import Button from "react-bootstrap/Button";

import { useAuth } from '../context/AuthContext';

export default function Header() {

  const { user, isAuth, handleLogout } = useAuth();

    return (
        <div className="App-header">
            <h1>Stress Relief Whiteboard App</h1>
            { isAuth ? 
            <div>
                <h3>Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h3>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            : null }
        </div>
    )
}