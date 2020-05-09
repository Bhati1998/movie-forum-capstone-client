import React, { Component } from 'react';
import PostForm from '../PostForm/PostForm';

export default class CreatePost extends Component {
    constructor(props) {
        super()
        this.state= {
            isButtonClicked: false
        }
    }

    handleFormRender = (e) => {
        // console.log('function working')
        this.setState({
            isButtonClicked: true
        }) 
    }


    render() {
        return (
            <div>
                <button onClick={(e) => this.handleFormRender(e)}>Create Post</button>
                {this.state.isButtonClicked ? <PostForm props={this.props.movie_db_id}/> : null }
            </div>
        )
    }
}