const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');

const router = require('./app/routes/route');

const app = express()
const port = process.env.PORT || 4000

let corsOptions = {
    origin:'http://localhost:4000'
}

app.use(cors())
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())


app.use('/', router);

module.exports = app