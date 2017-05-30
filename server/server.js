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
        message.createdAt = new Date().getTime();

        io.emit('newMessage', {from: message.form, text: message.text, createdAt: message.createdAt})
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to the chat app'
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, function() {
    console.log(`Server is up on ${port}`)
});