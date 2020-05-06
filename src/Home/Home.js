import React, { Component } from 'react';

const API_ENDPOINT = 'http://localhost:8000'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {
                searchTerm: ''
            },
            user: []
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
    checkInteger(inputInteger) {
        let outputValue = inputInteger
        if (inputInteger === "") {
            outputValue = 0
        }
        if (inputInteger === undefined) {
            outputValue = 0
        }
        if (inputInteger == null) {
            outputValue = 0
        }
        return outputValue
    }

    // if a string is undefinded or null, default it to "no details"
    checkString(inputString) {
        let outputText = inputString
        if (inputString === undefined) {
            outputText = "no details"
        }
        if (inputString == null) {
            outputText = "no details"
        }
        return outputText
    }

    // if a URL is undefinded or null, default it to the root url "/"
    checkURL(inputURL) {
        let outputURL = inputURL
        if (inputURL === undefined) {
            outputURL = "/"
        }
        if (inputURL == null) {
            outputURL = "/"
        }
        return outputURL
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

        console.log(data)

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

        console.log(url, 'this is the url console log')

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
                    <button type="submit">search</button>
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

                </form>
            </div>
        )
    }
}

export default Home