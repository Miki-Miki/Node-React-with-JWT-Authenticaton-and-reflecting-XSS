// const { noExtendLeft } = require('sequelize/types/lib/operators')
const { user } = require('../models')
const db = require('../models')
const ROLES = db.ROLES
const User = db.user

// check if requested email or username already exists
checkDuplicateUsernameOrEmail = (req, res, next) => {
    // username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: 'username taken'
            })
            return;
        }

        // email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if(user) {
                res.status(400).send({
                    message: 'email taken'
                })
                return
            }
    
            next()
        })
    })
}

// check if requested roles exist
checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `role ${req.body.roles[i]} does not exist`
                })
                return
            }
        }
    }

    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp