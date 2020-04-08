import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Link from 'react-router-dom';
// import Redirect from 'react-router-dom';
// import config from './config';
import NavBar from './NavBar/NavBar';
import Login from './Login/Login'
import Register from './Register/Register';
import Homepage from './Homepage/Homepage';
import CreatePost from './CreatePost/CreatePost';
import './App.css';



class App extends Component {
  // state = {
  //   notes: [],
  //   folders: [],
  // };

  // componentDidMount() {
  //   Promise.all([
  //     fetch(`${config.API_ENDPOINT}`),
  //   ])
  //     .then(([notesRes, foldersRes]) => {
  //       if (!notesRes.ok)
  //         return notesRes.json().then(e => Promise.reject(e));
  //       if (!foldersRes.ok)
  //         return foldersRes.json().then(e => Promise.reject(e));

  //       return Promise.all([notesRes.json(), foldersRes.json()]);
  //     })
  //     .then(([notes, folders]) => {
  //       this.setState({ notes, folders });
  //     })
  //     .catch(error => {
  //       console.error({ error })
  //     });
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
          <header>
            <h1>MovieChat</h1>
            {/* <Link to='/'><h1>MovieChat</h1></Link> */}
          </header>
          <Router>
          <main className="homepage">
            <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/post" component={CreatePost} />



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