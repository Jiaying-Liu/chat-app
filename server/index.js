var app = require('express')();
const server = app.listen(5000, () => {
    console.log(`App running on port 5000`)
});

var io = require('socket.io')(server);

io.on('connection', client => {
    client.on('chat message', msg => {
        io.emit('chat message', msg);
    })
});
