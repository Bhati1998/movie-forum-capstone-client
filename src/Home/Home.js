import React, { Component } from 'react';
import MovieList from '../MovieList/MovieList'
import './Home.css'

const API_ENDPOINT = 'http://localhost:8000'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {
                searchTerm: ''
            },
            user: [],
            movies: [],
            isSearchTriggered: false
        }
    }

    // convert query parameter from an object to a string
    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(params[key])}`)
        // .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }

    // if an integer is empty, undefinded or null, default it to 0
    // checkInteger(inputInteger) {
    //     let outputValue = inputInteger
    //     if (inputInteger === "") {
    //         outputValue = 0
    //     }
    //     if (inputInteger === undefined) {
    //         outputValue = 0
    //     }
    //     if (inputInteger == null) {
    //         outputValue = 0
    //     }
    //     return outputValue
    // }

    // if a string is undefinded or null, default it to "no details"
    // checkString(inputString) {
    //     let outputText = inputString
    //     if (inputString === undefined) {
    //         outputText = "no details"
    //     }
    //     if (inputString == null) {
    //         outputText = "no details"
    //     }
    //     return outputText
    // }

    // if a URL is undefinded or null, default it to the root url "/"
    // checkURL(inputURL) {
    //     let outputURL = inputURL
    //     if (inputURL === undefined) {
    //         outputURL = "/"
    //     }
    //     if (inputURL == null) {
    //         outputURL = "/"
    //     }
    //     return outputURL
    // }

    handleListRender = (e) => {
        this.setState({
            isSearchTriggered: true
        })
    }

    //get the imput from the user
    handleSearch = (e) => {
        e.preventDefault()
        // console.log(e.target, ' this is the e.target ')

        //create an object to store the search filters
        const data = {}

        //get all the from data from the form component
        const formData = new FormData(e.target)

        //for each of the keys in form data populate it with form value
        for (let value of formData) {
            data[value[0]] = value[1]
        }

        // console.log(data)

        //assigning the object from the form data to params in the state
        this.setState({
            params: data
        })

        //check if the state is populated with the search params data
        // console.log(this.state.params, 'this is the state.params')

        //get the google books api url
        const searchURL = `${API_ENDPOINT}/movie/search/`

        //format the queryString paramters into an object
        const queryString = this.formatQueryParams(data)

        //sent all the params to the final url
        // const url = searchURL + '?' + queryString
        const url = searchURL + encodeURI(queryString)

        // console.log(url, 'this is the url console log')

        //define the API call parameters
        const options = {
            method: 'GET',
            header: {
                "Authorization": "",
                "Content-Type": "application/json"
            }
        }

        //useing the url and paramters above make the api call
        fetch(url, options)

            // if the api returns data ...
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later.')
                }

                // ... convert it to json
                return res.json()
            })

            // use the json api output
            .then(data => {

                //check if there is meaningfull data
                // console.log(data);

                // check if there are no results
                if (data.length == 0) {
                    console.log('error')
                    throw new Error('No movies found')
                }

                // average_rating: 7.7
                // genre: "action"
                // img: "/lh5lbisD4oDbEKgUxoRaZU8HVrk.jpg"
                // movie_db_id: 272
                // movie_title: "Batman Begins"
                // overview: "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman."
                // release_date: "2005-06-10"

                // create and object with each one of the results
                const movies = data.map(movie => {

                    // get the title, authors, description, imageLinks, previewLink from "volumeInfo"
                    const { average_rating, genre, img, movie_db_id, movie_title, overview, release_date } = movie

                    const yearFromDate = release_date.substring(0,4)

                    //if the image is not defined replace it with a no-image image
                    // let imageLinksOutput = ''
                    // if (imageLinks === undefined) {
                    //     imageLinksOutput = 'https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png'
                    // } else {
                    //     imageLinksOutput = imageLinks.thumbnail
                    // }

                    //check if the data validation works
                    // console.log(this.checkString(title));
                    // console.log(this.checkString(authors));
                    // console.log(this.checkString(description));
                    // console.log(this.checkURL(previewLink));
                    // console.log(this.checkURL(imageLinksOutput));
                    // console.log(this.checkInteger(saleability));
                    // console.log(this.checkInteger(retailPrice));

                    // fix the inconsitent results and return them
                    return {
                        movie_title: (movie_title),
                        movie_db_id: (movie_db_id),
                        overview: (overview),
                        release_date: (release_date),
                        release_year: (yearFromDate),
                        average_rating: (average_rating),
                        genre: (genre),
                        img: (img),
                    }
                })

                //check if the validated data is structured in a new array objects
                console.log(movies);

                //send all the results to the state
                this.setState({
                    movies: movies,
                    error: null
                })
                // console.log(this.state, 'this is the state *****')
            })

            //catch connection errors
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err.message
                })
            })

    }

    render() {
        const errorMessage = this.state.error ? <div>{this.state.error}</div> : false

        return (
            <div>
                <form onSubmit={this.handleSearch}>
                    <label>Search:</label>
                    <input type='text'
                        name='searchTerm'
                        className='search-bar'
                        placeholder='Batman'
                        required />
                    <button type="submit" onClick={this.handleListRender}>search</button>
                </form>
                    {this.state.isSearchTriggered ? 
                    (<ul className="movie-list">
                        {this.state.movies.map(movie =>
                            (<li key={movie.movie_db_id}>
                                <MovieList
                                    average_rating={movie.average_rating}
                                    genre={movie.genre}
                                    img={movie.img}
                                    movie_db_id={movie.movie_db_id}
                                    movie_title={movie.movie_title}
                                    overview={movie.overview}
                                    release_year={movie.release_year}
                                    release_date={movie.release_date}
                                />
                            </li>)
                        )}
                    </ul>) : null }
                    {/* <div className='filter-bar'>
                        <label>Print Type</label>
                        <select name="printType">
                            <option value='all'>All</option>
                            <option value='books'>Books</option>
                            <option value='magazines'>magazines</option>
                        </select>
                        <label>Book Type</label>
                        <select name='filter'>
                            <option value='ebooks'>ebooks</option>
                            <option value='free-ebooks'>Free-ebooks</option>
                            <option value='full'>Full</option>
                            <option value='paid-ebooks'>Paid</option>
                            <option value='partial'>previews</option>
                        </select>
                    </div> */}
                    {/* <MovieList movies={this.state.movies} /> */}

                
            </div>
        )
    }
}

export default Home