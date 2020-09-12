import React, { Component } from "react";
import "./NavBar.css";

export default class Navbar extends Component {
  onLogout = (e) => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
  }

  changeNav = () => {
    switch (window.location.pathname) {
      case "/your-posts":
        return "Home"
      case "/home":
        return "Your Posts"
    }
  }

  changeLogin = () => {
    if (window.location.pathname == "/") {
      return
    } else if (window.location.pathname == "/register") {
      return
    } else {
      return "Logout"
    }
  }

  render() {
    let navLink = this.changeNav()
    let logLink = this.changeLogin()

    this.changeAnchor = () => {
      if (window.location.pathname == "/home") {
        return <a href="/your-posts">{navLink}</a>
      } else {
        return <a href="/home">{navLink}</a>
      }
    }
    let anchorChange = this.changeAnchor()

    return (
      <div className="main-nav">
        <div className="user-posts">
          <div>
            {anchorChange}
          </div>
        </div>
        <div className="login">
          <a href="/" onClick={this.onLogout}>
            {logLink}
          </a>
        </div>
      </div>
    )
  }
}
