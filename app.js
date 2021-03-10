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
const bcrypt = require('bcrypt')

// const { Model } = require('objection')
// Model.knex(database)

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
    bcrypt.hash(request.body.password, 12)
        .then(hashedPassword => {
            const user = {
                username: request.body.username,
                password: hashedPassword
            }
            queries.createUser(user)
            .then(user => queries.createNewUserCommands(user.id))
            .then(user => queries.showUser(user.id))
            .then(thisuser => response.send({ user: {
                id: thisuser[0].id, 
                username: thisuser[0].username, 
                usercommands: thisuser[0].usercommands 
                }
            }))
        .catch(error => {
            response.json({ errors: error.message })
        })
    })

})

app.delete('/users/:id', (request, response) => {
    queries.deleteUser(request.params.id)
    // .then(response.status(204))
    .then(user => response.send({deleted: user}))
})

app.post('/login', (request, response) => {
    queries.login(request.body)
    .then(result => {
        if(result.id){
            return bcrypt.compare(request.body.password, result.password)
        } else {
            throw new Error("username not found")
        }
    })
    .then(passwordComparison => {
        if(!passwordComparison) {
            throw new Error("incorrect password")
        } else {
            response.send({ message: "it worked!"})
        }
    })
    .catch(error => {
        response.send({ errors: error.message })
    })
})

app.post('/usercommands/:id', (request, response) => {
    const phrase = request.body.phrase
    const id = request.params.id
    queries.updateUserCommand({ phrase: phrase, id: id })
    .then(updatedUserCommand => response.send({updatedUserCommand}))
})


app.listen(port, () => console.log(`running on ${port}`))