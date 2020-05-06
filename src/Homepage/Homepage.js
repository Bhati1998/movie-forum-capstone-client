import React, { Component } from 'react';
// import { API_ENDPOINT } from '../config'
import './Homepage.css'

const API_ENDPOINT = 'http://localhost:8000'

export default class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {
                searchTerm: ""
            },
            user: []
        }
    }


    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }

    // getMovieData(searchTerm) {
    // 	const url = `${API_ENDPOINT}/movie/search/${searchTerm}`
    // 	fetch(url)
    // 		.then(response => {
    // 			if (!response.ok) {
    // 				throw new Error(response.statusText);
    // 			}
    // 			return response.json();
    // 		})
    // 		.then(data => {
    // 		console.log(data)
    // 			this.setState({
    // 				wineData: data,
    // 				 hidediv: true
    // 		})
    // 	})
    // 		.catch(err => {
    // 			console.log(err);
    // 		});
    // }

    handleSearch = e => {
        e.preventDefault()
        const { searchTerm } = e.target
        console.log(searchTerm);
        console.log(e.target, 'this is the e.target')

        //create an object to store the search filters
        const data = {}

        //get all the from data from the form component
        const formData = new FormData(e.target)
        console.log(formData)
        //for each of the keys in form data populate it with form value
        for (let value of formData) {
            data[value[0]] = value[1]
        }

        //assigning the object from the form data to params in the state
        this.setState({
            params: data
        })

        //check if the state is populated with the search params data
        console.log(this.state.params)

        //get the google books api url
        const searchURL = `${API_ENDPOINT}/movie/search/batman`

        //format the queryString paramters into an object
        const queryString = this.formatQueryParams(data)

        //sent all the params to the final url
        const url = searchURL + '?' + queryString

        console.log(url)

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
                console.log(data);

                // check if there are no results
                if (data.totalItems === 0) {
                    throw new Error('No books found')
                }

                // create and object with each one of the results
                const aBooks = data.items.map(book => {

                    // get the title, authors, description, imageLinks, previewLink from "volumeInfo"
                    const { title, authors, description, imageLinks, previewLink } = book.volumeInfo

                    // get the saleability, retailPrice from "saleInfo"
                    const { saleability, retailPrice } = book.saleInfo

                    //if the image is not defined replace it with a no-image image
                    let imageLinksOutput = ''
                    if (imageLinks === undefined) {
                        imageLinksOutput = 'https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png'
                    } else {
                        imageLinksOutput = imageLinks.thumbnail
                    }

                    //check if the data validation works
                    console.log(this.checkString(title));
                    console.log(this.checkString(authors));
                    console.log(this.checkString(description));
                    console.log(this.checkURL(previewLink));
                    console.log(this.checkURL(imageLinksOutput));
                    console.log(this.checkInteger(saleability));
                    console.log(this.checkInteger(retailPrice));

                    // fix the inconsitent results and return them
                    return {
                        title: this.checkString(title),
                        author: this.checkString(authors),
                        description: this.checkString(description),
                        previewLink: this.checkURL(previewLink),
                        thumbnail_URL: this.checkURL(imageLinksOutput),
                        saleability: this.checkInteger(saleability),
                        price: this.checkInteger(retailPrice),
                    }
                })

                //check if the validated data is structured in a new array objects
                console.log(aBooks);

                //send all the results to the state
                this.setState({
                    books: aBooks,
                    error: null
                })
            })

            //catch connection errors
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    }




    render() {
        return (
            <div className='homepage'>
                {/* <div 
                    className='featured'
                >
                        Featured Items
                </div> */}
                <form
                    onSubmit={this.handleSearch}
                >
                    Enter keywords to search posts by movie
                    <input name='searchTerm' id='searchTerm' type='text' />
                    <button type='submit'>Submit</button>
                </form>
                <div
                    className='create-post'
                >
                    Create Post
                </div>

            </div>
        )
    }
}