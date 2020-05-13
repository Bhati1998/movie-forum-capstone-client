import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoviePage from '../MoviePage/MoviePage';
import CreatePost from '../CreatePost/CreatePost';
import Posts from '../Posts/Posts';
import './MovieList.css';

export default class MovieList extends Component {
    handleSubmit = (e) => {
        console.log(this.props)
        // this.setState(this.props)
        // console.log(this.state)
    }
    render() {
        // console.log(this.props.release_yr, 'this should be the year')
        return (
            <div className='movie-card'>
                <img src={this.props.img} alt='Movie' />
                {/* <Link to={{
                    pathname: `/movie/${this.props.movie_title}`,
                    component:{MoviePage},
                    state: {
                        movie: this.props
                    }
                }}
                ><p className='title'>{this.props.movie_title}({this.props.release_year})</p></Link> */}
                <p className='title'>{this.props.movie_title}({this.props.release_year})</p>
                {/* <p className='release-date'>{this.props.release_date}</p> */}
                <p className='genre'>Genre: {this.props.genre}</p>
                <p className='rating'>Rating: {this.props.average_rating}</p>
                <p className='overview'>{this.props.overview}</p>

                <CreatePost movie_db_id={this.props.movie_db_id}/>
                <Posts movie_db_id={this.props.movie_db_id}/>
                
            </div>
            // <div className='movie-card'>
            //     <img src={this.props.img} alt='Movie' />
            //     <p className='title'>{this.props.movie_title}</p>
            //     <p className='release-date'>{this.props.release_date}</p>
            //     <p className='genre'>{this.props.genre}</p>
            //     <p className='rating'>{this.props.average_rating}</p>
            //     <p className='release-year'>{this.props.release_year}</p>
            //     <p className='overview'>{this.props.overview}</p>

            // </div>
        )
    }
}