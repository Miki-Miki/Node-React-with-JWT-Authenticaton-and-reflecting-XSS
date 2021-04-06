const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

// handling signup request from api
exports.signup = (req, res) => {
    // save user to db
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles /*select * from roles where name like {req.body.roles}*/
                    }
                }
            }).then(roles => {                
                user.setRoles(roles).then(() => {
                    res.send({
                        message: 'user was registered successfully.'
                    })
                })
            })
        }
        else {
            // if there are no roles specified then -> user role = 1
            user.setRoles([1]).then(() => {
                res.send({
                    message: 'user registered successfully'
                })
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: `auth.signup ERROR ${err.message}`
        })
    })
}

// handling signin requests from api
exports.signin = (req, res) => {
    // find user
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: '404 user not found'
            })
        }

        // check if password is valid with bcrypt.compareSync()
        var passwordIsValied = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValied) {
            return res.status(401).send({
                accessToken: null,
                message: 'invalid password'
            })
        }

        // signing JWT token for user
        var token = jwt.sign(
            { id: user.id },
            config.secret,
            { expiresIn: 90 /*token expires in 90 seconds*/ }
            )

        // giving the apriopriate roles to display them on the user profile
        var authorities = []
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push('ROLE_' + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: `auth.signin ERROR ${err.message}`
        })
    })
}