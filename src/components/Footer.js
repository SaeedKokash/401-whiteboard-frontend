import React from "react";
import cookies from 'react-cookies';

export default function Footer() {

    const userName = cookies.load('userName');

    return (
            <div className='App-footer'>

                { userName &&
                <p>Welcome {userName}</p>
                }
                <p>Stress Relief Whiteboard App Created by &copy;Saeed Kokash</p>
            </div>

    )
}