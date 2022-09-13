require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const io = require("socket.io");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/empleado', require('./empleados/empleado.controller'));
//app.use('/audio', require('./audio/audio.controller'));


// global error handler
app.use(errorHandler);

var server1 = app.listen(5000, "0.0.0.0", function() {
    console.log('Server listening on port ' + server1.address().port);
});
var socket = require('socket.io')(server1);
socket.on('connect', function (socket) {
    console.log("hi socket 1");
});

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
