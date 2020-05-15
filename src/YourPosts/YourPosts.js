import React, { Component } from "react";
import "./YourPosts.css";

const API_ENDPOINT = "http://localhost:8000";

export default class YourPosts extends Component {
  state = {
    posts: [],
    counter: 1,
  };

  componentDidMount() {
    console.log("running api call");
    fetch(`${API_ENDPOINT}/posts/user/${localStorage.getItem("user_id")}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          posts: data,
        });
      })
      .catch((err) => console.log(err));
  }

  getMovieById(movie_db_id) {
    fetch(`${API_ENDPOINT}/movies-by-id/${movie_db_id}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state, "this is the");
    // console.log(this.state.posts, 'this is teh state.props')
    let htmlOutput = "";
    if (this.state.posts.length == undefined) {
      const { post_title, post_content } = this.state.posts;
      htmlOutput = (
        <div className="post-wrapper">
          <div className="title-wrapper">
            <h5 className="post-title">{post_title}</h5>
          </div>
          <p className="post-content">{post_content}</p>
        </div>
      );
    } else {
      console.log("inside else");
      htmlOutput = this.state.posts.map((post) => {
        return (
          <div className="post-card">
            {/* {this.state.posts.map((post) => ( */}
              <div className="post-wrapper">
                <div className="author-wrapper">
                  <div className="post-author">{localStorage.username}</div>
                  <div className="created-date">{post.created_at}</div>
                </div>
                <div className="title-wrapper">
                  <h5 className="post-title">{post.post_title}</h5>
                </div>
                <p className="post-content">{post.post_content}</p>
              </div>
          </div>
        );
      });
    }

    return <div className="post-card">{htmlOutput}</div>;
  }
}
