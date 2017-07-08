
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log("Alguien se ha conectado con Socket ");


  socket.on('disconnect', (data) => {
    console.log("Disconnect a user sockects connected");
  });

  socket.on('subscribe', (room)=>{
    console.log('joining room', room);
    socket.join(room);
  })

  socket.on('send menssage', (data)=>{
    console.log('sending room post', data.room);
    socket.broadcast.to(data.room).emit('conversation private post',
    {
      data: data
    })
  });


});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/clienteDos', (req, res) => {
  res.sendFile(__dirname + '/cliente.html');
});

server.listen(3000, (e) => {
  console.log("Server escuchando en el puerto 3000");
})