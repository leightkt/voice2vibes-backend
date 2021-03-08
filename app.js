const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 9000
const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE'
}

app.use(cors(corsOptions))



app.get('/', (request, response) => {
    response.send({message: "THE ROUTE WORKED!"})
})


app.listen(port, () => console.log(`running on ${port}`))