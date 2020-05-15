import React, { Component } from "react";
import Moment from 'react-moment';
import "./Posts.css";

const API_ENDPOINT = "http://localhost:8000";

export default class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    fetch(`${API_ENDPOINT}/posts/${this.props.movie_db_id}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "this is is the data");
        this.setState({
          posts: data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    // console.log(this.props, 'these are props within post')
    return (
      <div className="post-card">
        {this.state.posts.map((post) => (
          <div className="post-wrapper">
            <div className="author-wrapper">
              <div className="post-author">{localStorage.username}</div>
              <div className="created-date">
                <Moment format="HH:mm MM/DD/YYYY ">{post.created_at}</Moment>
              </div>
            </div>
            <div className="title-wrapper">
              <h5 className="post-title">{post.post_title}</h5>
            </div>
            <p className="post-content">{post.post_content}</p>
          </div>
        ))}
      </div>
    );
  }
}
