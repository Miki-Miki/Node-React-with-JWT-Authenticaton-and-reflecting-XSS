// this module is concerned with storing user information;
// containing the access token
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.accessToken) {
        return { 
            'x-access-token': user.accessToken
        }
    } else {
        return {}
    }
}