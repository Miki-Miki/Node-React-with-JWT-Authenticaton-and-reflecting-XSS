const { verifySignUp } = require('../middleware')
const controller = require('../controllers/auth.controller')

// this module represents routes to necessary authentication
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.post(
        '/api/auth/signup',
        [
            // functions necessary to pass
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    )

    app.post('/api/auth/signin', controller.signin)
}