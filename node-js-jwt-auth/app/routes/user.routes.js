const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    // the api routes bellow allow for the testing of generated jwt access tokens
    app.get('/api/test/all', controller.allAcess)

    app.get(
        '/api/test/user',
        [authJwt.verifyToken],
        controller.userBoard
    )

    app.get(
        '/api/test/mod',
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    )

    app.get(
        '/api/test/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )
}