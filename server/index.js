var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

io.on('connection', client => {
    client.on('chat message', msg => {
        console.log('msg is ', msg);
        io.emit('chat message', msg);
    })
});

http.listen(5000, () => {
    console.log('listening on 5000');
});
