import React from "react";
import Button from "react-bootstrap/Button";

import { useAuth } from '../context/AuthContext';

export default function Header() {

  const { userData, handleLogout } = useAuth();

    return (
        <div className="App-header">
            <h1>Stress Relief Whiteboard App</h1>
            { userData.isAuth ? 
            <div>
                <h3>Welcome {userData.user.username.charAt(0).toUpperCase() + userData.user.username.slice(1)}</h3>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            : null }
        </div>
    )
}