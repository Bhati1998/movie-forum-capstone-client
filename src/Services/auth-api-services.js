// import config from '../config'

const API_ENDPOINT = 'http://localhost:8000'

const AuthApiService = {
    postLogin(credentials) {
        console.log(credentials, 'these are the credentials')
        return fetch(`${API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
            
        })
        .then(res => {
            console.log(res, 'this is the res for auth')
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
        .catch(err => console.log(err))
    },
    postUser(user) {
        console.log(`${API_ENDPOINT}/user`)
        return fetch(`${API_ENDPOINT}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json() 
                })
            .catch(err => console.log(err))

    },
}

export default AuthApiService