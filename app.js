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
const jwt = require('jsonwebtoken')

app.use( cors(corsOptions) )
app.use( bodyParser.urlencoded({ extended: false}) )
app.use( bodyParser.json() )

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
            .then(thisuser => {
                const payload = { username: thisuser[0].username }
                const secret = process.env.SECRET_KEY_BASE

                jwt.sign(payload, secret, (error, token) => {
                    if (error) throw new Error("Signing Token didn't work")
                    
                    response.send({ user: {
                        token: token,
                        id: thisuser[0].id, 
                        username: thisuser[0].username, 
                        usercommands: thisuser[0].usercommands 
                        }
                    })
                })   
            })
        .catch(error => {
            response.json({ errors: "username already taken" })
        })
    })

})

app.delete('/users/:id', authenticate, (request, response) => {
        // request.user.username if pulling from authenticate
        queries.deleteUser(request.params.id)
            // .then(response.status(204))
        .then(user => response.send({deleted: user}))
        .catch(error => {
            response.json({ errors :error.message })
        })
})

app.post('/login', (request, response) => {
    queries.findUser(request.body.username)
    .then(retrievedUser => {
        if(retrievedUser){
            return Promise.all([
                bcrypt.compare(request.body.password, retrievedUser.password),
                Promise.resolve(retrievedUser)
            ])
        } else {
            throw new Error("username not found")
        }
    })
    .then(results => {
        if(!results[0]) {
            throw new Error("incorrect password")
        } else {
            const payload = { username: results[1].username}
            const secret = process.env.SECRET_KEY_BASE

            jwt.sign(payload, secret, (error, token) => {
                if (error) throw new Error("Signing Token didn't work")

                response.send({ user: {
                    token: token,
                    id: results[1].id,
                    username: results[1].username,
                    usercommands: results[1].usercommands
                }})
            })

        }
    })
    .catch(error => {
        response.send({ errors: error.message })
    })
})

app.post('/usercommands/:id', authenticate, (request, response) => {
    const phrase = request.body.phrase
    const id = request.params.id
    queries.updateUserCommand({ phrase: phrase, id: id })
    .then(updatedUserCommand => response.send({ updatedUserCommand }))
})

app.get('/profile', authenticate, (request, response) => {
    response.json({
            id: request.user.id,
            username: request.user.username,
            usercommands: request.user.usercommands
        }
    )
})

function authenticate(request, response, next){
    const secret = process.env.SECRET_KEY_BASE
    const authHeader = request.get("Authorization")
    if(!authHeader){
        response.json({ errors: "no token"})
    }

    const token = authHeader.split(" ")[1]
    
    
    jwt.verify(token, secret, (error, payload) => {
        if(error) response.json({ errors: error.message })

        queries.findUser(payload.username)
        .then(user => {
            request.user = user
            next()
        })
        .catch(error => {
            response.json({ errors :error.message })
        })
    })
}

app.listen(port, () => console.log(`running on ${port}`))
