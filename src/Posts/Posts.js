import React, { Component } from "react";

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
      .then((data) =>
        this.setState({
          posts: data,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    // console.log(this.props, 'these are props within post')
    return (
      <div className="post-card">
        {this.state.posts.map((post) => (
          <>
            <h5 className="post-title">{post.post_title}</h5>
            <p className="post-content">{post.post_content}</p>
          </>
        ))}
      </div>
    );
  }
}
