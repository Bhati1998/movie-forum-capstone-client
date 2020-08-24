import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Link from "react-router-dom";
import Redirect from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Homepage from "./Homepage/Homepage";
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
  };

  setUserId = (userId) => {
    this.setState({
      user_id: userId,
    });
  };
  // getMovieData(searchTerm) {
  // 	const url = `${API_ENDPOINT}/movie/search/${searchTerm}`
  // 	fetch(url)
  // 		.then(response => {
  // 			if (!response.ok) {
  // 				throw new Error(response.statusText);
  // 			}
  // 			return response.json();
  // 		})
  // 		.then(data => {
  // 		console.log(data)
  // 			this.setState({
  // 				wineData: data,
  // 				 hidediv: true
  // 		})
  // 	})
  // 		.catch(err => {
  // 			console.log(err);
  // 		});
  // }
  // }

  render() {
    //   const contextValue = {
    //     notes: this.state.notes,
    //     folders: this.state.folders,
    //     deleteNote: this.handleDeleteNote,
    //     addFolder: this.addFolder,
    //     addNote: this.addNote,
    //     addErrorNotes: this.addErrorNotes,
    //     notesError: this.notesError
    //   }

    return (
      <div className="App">
        <NavBar />
        {/* <Homepage /> */}
        <header>
          <h1>MovieChat</h1>
          <h5>
            Discuss, critique and review movies you love, hate, and can't wait
            to see
          </h5>
          {/* <Link to='/'><h1>MovieChat</h1></Link> */}
        </header>
        <Router>
          <main className="homepage">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home {...props} userId={this.state.user_id} />
                )}
              />
              <Route
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    setUserId={(userId) => this.setUserId(userId)}
                  />
                )}
              />
              <Route path="/register" component={Register} />
              <Route path="/post" component={CreatePost} />
              <Route path="/movie" component={MoviePage} />
              <Route path="/your-posts" component={YourPosts} />
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
    );
  }
}

export default App;
