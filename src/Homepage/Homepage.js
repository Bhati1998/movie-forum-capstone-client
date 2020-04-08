import React, { Component } from 'react';
import './Homepage.css'

export default class Homepage extends Component {
    render() {
        return(
            <div className='homepage'>
                <div 
                    className='featured'
                >
                        Featured Items
                </div>
                <div 
                    className='create-post'
                >
                        Create Post
                </div>
                <div 
                    className='search'
                >
                    Enter keywords to search posts by movie
                    <input type='text' label='search-keyword'></input>
                    <button type='submit'></button>
                </div>
            </div>
        )
    }
}