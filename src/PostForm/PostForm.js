import  React, { Component } from 'react'; 

const API_ENDPOINT = 'http://localhost:8000'

export default class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post_title: '',
            post_content: '',
            user_id: 2,
            movie_db_id: this.props.movie_db_id
        }
    }

    handleTitleChange = (e) => {
        this.setState({ post_title: e.target.value });
    }

    handleContentChange = (e) => {
        this.setState({ post_content: e.target.value });
    }

    buttonTest = (e) => {
        console.log('button working', this.state)
    }

    handleSubmitPost = () => {
        console.log('function triggering')
            fetch(`${API_ENDPOINT}/posts`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(this.state),

            })
            .then(res => {
                console.log(res.status)
                if (res.status != 201) {
                    alert('Unable to post')
                }
                // (!res.ok)
                //     ? res.json().then(e => Promise.reject(e))
                //     : res.json()
                    // window.location = '/'
            })
            .catch(err => console.log(err))
        }


    render() {

        return (

            <form onSubmit={this.handleSubmitPost}>
                Post Title
                <input type="text" name="title" placeholder="title" onChange={this.handleTitleChange} />
                Post Content
                <input type="text" name="content" placeholder="content" onChange={this.handleContentChange} />
                <button type="submit" onClick={this.buttonTest}>Create</button>
            </form>
        )
    }
}