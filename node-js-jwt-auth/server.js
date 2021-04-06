const express = require('express')
const cors = require('cors')

const app = express()

const db = require('./app/models')
const Role = db.role

// droping and resyncing the database and adding basic roles ['user', 'moderator', 'admin']
db.sequelize.sync({force: true}).then(() => {
    console.log('drop and resync db')
    initial()
})

var corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests of content-type: application/json 
app.use(express.json())

// parse requests of content-type: application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: true}))

// simple route
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello NeuraLegion.',
        please: 'give me a job'
    })
})

// routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// initialise basic roles
function initial() {
    Role.create({
        id: 1,
        name: 'user'
    })

    Role.create({
        id: 2,
        name: 'moderator'
    })

    Role.create({
        id: 3,
        name: 'admin'
    })
}


