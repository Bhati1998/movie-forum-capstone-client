import React, { Component } from 'react';
import Posts from '../Posts/Posts'
import CreatePost from '../CreatePost/CreatePost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default class MoviePage extends Component {

    

    render() {
        console.log(this.props)
        const { average_rating, genre, img, movie_db_id, movie_title, overview, release_year } = this.props.location.state.movie
        return (
            <>
            <div>
                <img src={img} />
                <h1>{movie_title}({release_year})</h1>
                <p>{genre}</p>
                <p><FontAwesomeIcon icon={faStar} style={{ color: 'gold' }}/> {average_rating}</p>
                {/* <p>{movie_db_id}</p> */}
                <p>{overview}</p>
            </div>
            <CreatePost movie_db_id={movie_db_id}/>
            <Posts movie_db_id={movie_db_id}/>
            </>
        )
    }
}