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
const { Model } = require('objection')
Model.knex(database)
const User = require('./models/User')
const Command = require('./models/Command')
const UserCommand = require('./models/UserCommand')

app.use(cors(corsOptions))



app.get('/users/:id', (request, response) => {
    let id= parseInt(request.params.id)
    User.query()
    .where('id', id)
    .eager('usercommands')
    .then(users => response.send({ users: users }))

})


app.listen(port, () => console.log(`running on ${port}`))