import React, { Component } from "react";
import "./NavBar.css";

export default class Navbar extends Component {
  onLogout = (e) => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
  };
  render() {
    return (
      <div className="main-nav">
        <div className="user-history">
          <div>{/* <YourPosts /> */}</div>
          <div>
            <a href="/your-posts">Your Posts</a>
          </div>
        </div>
        <div className="login">
          <a href="/login" onClick={this.onLogout}>
            Logout
          </a>
        </div>
      </div>
    );
  }
}
