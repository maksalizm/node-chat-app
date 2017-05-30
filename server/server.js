const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('createMessage', function (message) {
        console.log('create message: ', message);
        message.createAt = new Date();
    });

    socket.emit('newMessage', {
        form: 'JOHN',
        text: 'See you then',
        createdAt: new Date()
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, function() {
    console.log(`Server is up on ${port}`)
});