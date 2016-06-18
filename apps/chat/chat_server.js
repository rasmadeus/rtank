function use_chat_server(httpServer) {
    var io = require('socket.io')(httpServer);

    io.on('connection', function (socket) {
        socket.on('user_connected', function (data) {
            socket.broadcast.emit('message', {text: 'Tankist ' + data.user.name + ' joined us', user: data.user});
        });

        socket.on('user_send_message', function(message) {
            io.emit('message', {text: message.text, user: message.user});
        });
    });
}

module.exports = use_chat_server;