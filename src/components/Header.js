import React from "react";
import Button from "react-bootstrap/Button";
import cookies from 'react-cookies';



export default function Header(props) {

    const userName = cookies.load('userName');

    return (
        <div className="App-header">
            <h1>Stress Relief Whiteboard App</h1>
            { props.isAuth ? 
            <div>
                <h3>Welcome {userName}</h3>
                <Button onClick={props.handleLogout}>Logout</Button>
            </div>
            : null }
        </div>
    )
}