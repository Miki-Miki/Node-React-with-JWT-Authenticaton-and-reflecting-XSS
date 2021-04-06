// this module is responsible for verifying incoming access tokens
// and informing to current user on their level of authorization on the site

const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] /*the jwt token is set as 'x-access-token' in the request header*/

    if(!token) {
        return res.status(403).send({
            message: 'no access token provided'
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: 'unauthorized.'  /*this message will display once the user tries to access a site with an expired token*/
            })            
        }
        req.userId = decoded.id
        next()
    })
}

// check if requested user has admin role
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === 'admin') {
                    next()
                    return
                }
            }

            res.status(404).send({
                message: 'require admin role.'
            })

            return
        })
    })
}

// check if requested user has mdoerator role
isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === 'moderator') {
                    next()
                    return
                }
            }

            res.status(404).send({
                message: 'require moderator role.'
            })

            return
        })
    })
}

// check if requested user has mdoerator or admin role
isModeratorAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === 'moderator') {
                    next()
                    return                    
                }

                if(roles[i].name === 'admin') {
                    next()
                    return
                }
            }

            res.status(403).send({
                message: 'requre moderator or admin role.'
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorAdmin
}
module.exports = authJwt

