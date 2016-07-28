var express   = require('express')
var app = express();
app.use(express.static("public"));
var http   = require('http').Server(app);
var io     = require('socket.io')(http);
var line_history = [];


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
//incoming connection - send history to new client - add handler for message type
io.on('connection', function(socket){
  for ( var i in line_history) {
    socket.emit('draw_line', { line: line_history[i]});
  }
  socket.on('draw_line', function(pic){
    // add received line to history
    line_history.push(pic.line);
    // send line to all clients
    io.emit('draw_line', {line: pic.line});
  });
});



http.listen(3000, function () {
  console.log("listining on *:3000");
})
