import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Link from 'react-router-dom';
import Redirect from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Login from './Login/Login'
import Register from './Register/Register';
import Homepage from './Homepage/Homepage';
import CreatePost from './CreatePost/CreatePost';
import { API_ENDPOINT } from './config'
import Home from './Home/Home'
import MoviePage from './MoviePage/MoviePage'
import './App.css';



class App extends Component {


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
            {/* <Link to='/'><h1>MovieChat</h1></Link> */}
          </header>
          <Router>
          <main className="homepage">
            <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/post" component={CreatePost} />
            <Route path='/movie' component={MoviePage} />



            {/* <div className="navbar">
              {this.renderSidebar()}
            </div> */}
            {/* <div className="main">
              {this.renderMain()}
            </div> */}


            {/* <Homepage />
            <Login />
            <Register /> */}
            </Switch>
          </main>
          </Router>
        </div>
    );
  }
}

export default App