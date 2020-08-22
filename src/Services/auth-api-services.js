import config from '../config'

const AuthApiService = {
    postLogin(credentials) {
        console.log(credentials, 'these are the credentials')

        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
            
        })
        .then(res => {
            console.log(res.status)
            if (res.status != 200) {
                alert('Invalid login details')
            }
            else {
                // res.json()
                return res.json()
                // window.location = '/'
            }
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
                // window.location = '/'
        })
        .catch(err => console.log(err))
    },
    postUser(user) {
        // console.log(`${API_ENDPOINT}/user`)
        return fetch(`${config.API_ENDPOINT}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                console.log(res.error)
                if (res.status == 400) {
                    alert('username or email is already taken')
                }
                else if (res.status != 201) {
                    alert('could not create user')
                }
                else {
                    window.location = '/login'
                }
                // console.log(res, 'this is the res for post user')
                // return res.json()
                // window.location.href='/login'
                // (!res.ok)
                //     ? res.json().then(e => Promise.reject(e))
                //     : res.json() 
                })
            .catch(err => console.log(err))

    },
}

export default AuthApiService