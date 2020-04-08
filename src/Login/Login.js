import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {
    render() {
        return(
            <div className='login-page'>
                <div>
                    Username
                    <input type='text'></input>
                </div>
                <div>
                    Password
                    <input type='text'></input>
                </div>
                <div>
                    <a href='#'>Forgot Password?</a>
                </div>
                <div>
                    Don't have an account? <a href='#'>Register here</a>
                </div>
            </div>
        )
    }
}