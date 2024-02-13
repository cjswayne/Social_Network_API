const express = require('express');
const connection = require('./config/connection');

const PORT = 3333;

const app = express();

const { user_routes, thought_routes } = require('./routes/api_routes')

app.use(express.json());

app.use('/api', [user_routes, thought_routes])

connection.on('open', () => {
    app.listen(PORT, () => {
        console.log("Server started on port: ", PORT)
    })
})