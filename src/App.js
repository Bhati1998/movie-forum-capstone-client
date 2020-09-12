import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Link from "react-router-dom";
import Redirect from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Login from "./Login/Login";
import Register from "./Register/Register";
import CreatePost from "./CreatePost/CreatePost";
import { API_ENDPOINT } from "./config";
import Home from "./Home/Home";
import MoviePage from "./MoviePage/MoviePage";
import YourPosts from "./YourPosts/YourPosts";
import "./App.css";

class App extends Component {
  state = {
    user_id: "",
    movie_db_id: "",
  }

  setUserId = (userId) => {
    this.setState({
      user_id: userId,
    })
  }

  render() {

    return (
      <div className="App">
        <NavBar />
        <header>
          <h1>MovieChat</h1>
          <h5>
            Discuss, critique and review movies you love, hate, and can't wait
            to see
          </h5>
        </header>
        <Router>
          <main className="homepage">
            <Switch>
              <Route
                exact
                path="/home"
                render={(props) => (
                  <Home {...props} userId={this.state.user_id} />
                )}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/your-posts" component={YourPosts} />
              <Route
                path="/"
                render={(props) => (
                  <Login
                    {...props}
                    setUserId={(userId) => this.setUserId(userId)}
                  />
                )}
              />
            </Switch>
          </main>
        </Router>
        <footer>
          <a
            href="https://www.linkedin.com/in/christian-m-george"
            className="linkedin-icon"
            target="_blank"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/christian-m-george"
            className="github-icon"
            target="_blank"
          >
            <i className="fa fa-github"></i>
          </a>
          <a
            href="https://christian-m-george.github.io/portfolio/"
            className="portfolio-icon"
            target="_blank"
          >
            <i className="fa fa-address-card"></i>
          </a>
        </footer>
      </div>
    )
  }
}

export default App
