const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('createMessage', function (message, cb) {
        console.log('create message: ', message);
        message.createdAt = new Date().getTime();

        io.emit('newMessage', generateMessage(message.from, message.text));
        cb();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
    });

    socket.emit('newMessage', generateMessage('admin','welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('admin','New user join'));

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, function() {
    console.log(`Server is up on ${port}`)
});