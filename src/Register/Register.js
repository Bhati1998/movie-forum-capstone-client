import React, { Component } from 'react';
import './Register.css'

export default class Register extends Component {
    render() {
        return (
            <div className='register-page'>
                Register for MovieChat
                <div>
                    Username
                    <input
                        type='text'
                    >
                    </input>
                </div>
                <div>
                    Password
                    <input
                        type='text'
                    >
                    </input>
                </div>
                <div>
                    Confirm Password
                    <input 
                        type='text'>
                    </input>
                </div>
                <button>
                    Submit!
                </button>
            </div>
        )
    }
}