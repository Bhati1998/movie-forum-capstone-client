import React from 'react';
import './NavBar.css'

export default function Navbar() {
    return (
        <div className="main-nav">
            <div className='user-history'>
                <div>
                    <a href='#'>Your Posts</a>
                </div>
                <div>
                    <a href='#'>Your Comments</a>
                </div>
            </div>
            <div className='login'>
                <a href='#'>Login/Logout</a>
            </div>
        </div>
    )
}