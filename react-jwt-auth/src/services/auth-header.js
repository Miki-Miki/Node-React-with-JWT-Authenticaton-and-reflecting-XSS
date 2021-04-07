// this module is concerned with authenticating user information;
// checking their access token
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
