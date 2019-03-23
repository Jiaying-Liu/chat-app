var app = require('express')();
//var http = require('http').Server(app);
const server = app.listen(5000, () => {
    console.log(`App running on port 5000`)
});

var io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

io.on('connection', client => {
    client.on('chat message', msg => {
        console.log('msg is ', msg);
        io.emit('chat message', msg);
    })
});

