/**
 * Created by maksalizm on 2017. 6. 5..
 */
var socket = io();
socket.on('connect', function () {
    socket.on('getListRoom', function(rooms) {
        rooms.forEach((room) => {
            $('#roomList').append(`<li class="form-field">${room.room}</li>`)
        });
        console.log(rooms);
    })
});