import React, { Component } from 'react';
import Posts from '../Posts/Posts'
import CreatePost from '../CreatePost/CreatePost'

export default class MoviePage extends Component {

    // handleClick = (e) => {
    //     console.log(this.props.location.state.movie.average_rating)
    // }

    // renderMoviePage = (e) => {
    //     const { average_rating, genre, img, movie_db_id, movie_title, overview, release_year } = this.props.location.state.movie
    //     console.log('function is running')
    //     return (
    //         <div>
    //             <img src={img} />
    //             <h1>{movie_title}({release_year})</h1>
    //             <p>{genre}</p>
    //             <p>{average_rating}</p>
    //             <p>{movie_db_id}</p>
    //             <p>{overview}</p>
    //         </div>
    //     )
    // }

    render() {
        const { average_rating, genre, img, movie_db_id, movie_title, overview, release_year } = this.props.location.state.movie
        return (
            <>
            <div>
                <img src={img} />
                <h1>{movie_title}({release_year})</h1>
                <p>{genre}</p>
                <p>{average_rating}</p>
                <p>{movie_db_id}</p>
                <p>{overview}</p>
            </div>
            <CreatePost props={movie_db_id}/>
            <Posts props={movie_db_id}/>
            </>
        )
    }
}