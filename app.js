const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());

const server = require('http').createServer(app);//express object
const io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('A user connected');
  socket.on('message', function(data){
    console.log('Message data', data);
  });
});
module.exports = io;

app.get('*', (req, resp) => {
  io.emit('message', 'this is text');
  resp.json({ message: 'Huhhhh!' });
})

const port = process.env.port || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});