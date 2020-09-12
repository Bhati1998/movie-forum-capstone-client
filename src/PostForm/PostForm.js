import  React, { Component } from 'react'; 
import './PostForm.css';
import config from '../config';

export default class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post_title: '',
            post_content: '',
            user_id: localStorage.getItem('user_id'),
            username: localStorage.getItem('username'),
            movie_db_id: this.props.movie_db_id.movie_db_id,
        }
        this.handleSubmitPost = this.handleSubmitPost.bind(this)
    }

    handleTitleChange = (e) => {
        this.setState({ post_title: e.target.value })
    }

    handleContentChange = (e) => {
        this.setState({ post_content: e.target.value })
    }


    handleSubmitPost = (event) => {
        event.preventDefault()
        // console.log('function triggering')
            fetch(`${config.API_ENDPOINT}/posts`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(this.state),

            })
            .then(res => {
                // console.log(res.status)
                if (res.status != 201) {
                    alert('Unable to post')
                }
                window.location = '/your-posts'
                // alert('post succesful')
                // (!res.ok)
                //     ? res.json().then(e => Promise.reject(e))
                //     : res.json()
                // this.forceUpdate()
            })
            .catch(err => console.log(err))
        }


    render() {
        // console.log(this.state, 'this is the state', this.props.props, 'this is the props')
        return (
            <form className ='post-form' onSubmit={this.handleSubmitPost}>
                Post Title
                <input id='title-input' type="text" name="title" placeholder="title" onChange={this.handleTitleChange} />
                Post Content
                <input id='content-input' type="text" name="content" placeholder="content" onChange={this.handleContentChange} />
                <button id='submit-post' type="submit" onClick={this.checkState}>Submit Post</button>
            </form>
        )
    }
}