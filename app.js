const express = require('express')
const cors = require('cors')
const queries = require('./queries')

const app = express()
const port = process.env.PORT || 9000
const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE'
}
const database = require('./database/Database')
const bodyParser = require('body-parser')

const { Model } = require('objection')
Model.knex(database)
const User = require('./models/User')
const UserCommand = require('./models/UserCommand')
const { updateUserCommand } = require('./queries')

app.use( cors(corsOptions) )
app.use( bodyParser.urlencoded({ extended: false}) )
app.use( bodyParser.json() )

app.get('/users/', (request, response) => {
    queries.allUsers()
        .then(users => response.send({ users: users }))
})

app.get('/users/:id', (request, response) => {
    queries.showUser(+request.params.id)
        .then(thisuser => response.send({ user: {
            id: thisuser[0].id, 
            username: thisuser[0].username, 
            usercommands: thisuser[0].usercommands 
            }
        }))

})

app.post('/users', (request, response) => {
    queries.createUser(request.body)
    .then(user => queries.createNewUserCommands(user.id))
    .then(user => queries.showUser(user.id))
    .then(thisuser => response.send({ user: {
        id: thisuser[0].id, 
        username: thisuser[0].username, 
        usercommands: thisuser[0].usercommands 
        }
    }))
    

})

app.delete('/users/:id', (request, response) => {
    queries.deleteUser(request.params.id)
    // .then(response.status(204))
    .then(user => response.send({deleted: user}))
})

app.post('/login', (request, response) => {
    queries.login(request.body)
    .then(result => {
        if(result[0]){
            queries.showUser(result[0].id)
            .then(thisuser => response.send({ user: {
                id: thisuser[0].id, 
                username: thisuser[0].username, 
                usercommands: thisuser[0].usercommands 
                }
            }))
        } else {
            response.send({ errors: "Invalid Credentials"})
        }
    })
})

app.post('/usercommands/:id', (request, response) => {
    const phrase = request.body.phrase
    const id = request.params.id
    queries.updateUserCommand({ phrase: phrase, id: id })
    .then(updatedUserCommand => response.send({updatedUserCommand}))
})


app.listen(port, () => console.log(`running on ${port}`))