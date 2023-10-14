const express = require('express');
const app = express();
const { mongoose } = require('./DB/mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// Load in the mongoose models
const  User  = require('./Models/User');
const cors=require('cors');
/* MIDDLEWARE  */

// Load middleware
app.use(bodyParser.json());
app.use(cors());


// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
    // res.header( 'Access-Control-Allow-Origin', 'http://localhost:4200' )
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

const userRoutes = require('./Routes/users')
app.use('/users',userRoutes);

const videoRoutes = require('./Routes/videos')
app.use('/videos',videoRoutes);


const live_session = require('./Routes/live')
app.use('/live',live_session);

app.listen(3000 ,()=>{console.log("Server listening on port 3000")});
