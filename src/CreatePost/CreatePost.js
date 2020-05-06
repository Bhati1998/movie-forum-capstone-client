import React, { Component } from 'react';

export default class CreatePost extends Component {
    render() {
        return (
            <div>
                <form>
                    Create Post
                    <div>
                        Post Title
                        <input></input>

                    Post content
                        <input></input>
                    </div>
                </form>
            </div>
        )
    }
}