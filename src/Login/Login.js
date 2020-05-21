import React, { Component } from "react";
import ValidationError from "../validation-error";
import TokenService from "../Services/token-services";
import AuthApiService from "../Services/auth-api-services";
import "./Login.css";
import config from '../config'
// const API_ENDPOINT = "http://localhost:8000";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
        touched: false,
      },
      email: {
        value: "",
        touched: false,
      },
      password: {
        value: "",
        touched: false,
      },
      error: null,
    };
  }

  // handleLoginSuccess = () => {
  //   window.location = "/";
  // };

  redirectOnSetUser() {
    console.log('function running')
    if (localStorage.getItem('username') != undefined) {
      window.location.href = '/'
    }
  }

  updateEmail(email) {
    this.setState({ email: { value: email, touched: true } });
  }

  updatePassword(password) {
    this.setState({ password: { value: password, touched: true } });
  }

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { email, password } = ev.target;
    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((data) => {
        console.log(data, "this is the data from auth");
        this.props.setUserId(data.userId);
        localStorage.setItem("user_id", data.userId);
        fetch(`${config.API_ENDPOINT}/user/id/${data.userId}`, {
          method: "get",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) =>  {
            console.log(data, 'this is the data')
          localStorage.setItem('username', data.username)
          this.redirectOnSetUser()
          })

          // .then((data) => localStorage.setItem("username", data.username))
          .catch((err) => console.log(err));
        // localStorage.setItem("username", data.username)
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(data.authToken);
        TokenService.saveUserId(data.userId);
        
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.formError();
      });

  };

  formError = () => {};

  validateEmail() {
    const email = this.state.email.value.trim();
    if (email.length === 0) {
      return <p className="input-error">Email is required</p>;
    } else if (email.length < 5) {
      return (
        <p className="input-error">Email must be at least 5 characters long</p>
      );
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return <p className="input-error">Password is required</p>;
    } else if (password.length < 6 || password.length > 72) {
      return (
        <p className="input-error">
          Password must be between 6 and 72 characters long
        </p>
      );
    } else if (!password.match(/[0-9]/)) {
      return (
        <p className="input-error">Password must contain at least one number</p>
      );
    }
  }

  render() {
    return (
      <div className="container" id="container">
          <div className="form-container sign-in-container">
        <h2>Log in</h2>
        <form className="login-form" onSubmit={this.handleSubmitJwtAuth}>
          <div className="login-form-entry">
            <label htmlFor="email">Email</label>
            <input
              className="login-control"
              type="text"
              name="email"
              id="email"
              onChange={(e) => this.updateEmail(e.target.value)}
            />
            {this.state.email.touched && (
              <ValidationError message={this.validateEmail()} />
            )}
          </div>
          <div className="login-form-entry">
            <label htmlFor="password">Password</label>
            <input
              className="login-control"
              type="password"
              name="password"
              id="password"
              onChange={(e) => this.updatePassword(e.target.value)}
            />
            {this.state.password.touched && (
              <ValidationError message={this.validatePassword()} />
            )}
          </div>
          <button type="submit">Log in</button>
          <div className="registration-link-wrapper">
              <a id='register-link' href='/register'>Don't have an account? Register here</a>
          </div>
          
          <div className="error-message">{this.state.error}</div>
          {/* <div className='demo-info'>
                        <p className='login-form-p'><b>To view a demo use:</b></p>
                        <p className='login-form-p'><b>Email:</b> artlover3000@test.com</p>
                        <p className='login-form-p'><b>Password:</b> password1</p>
                    </div> */}
        </form>
        </div>
      </div>
    );
  }
}
