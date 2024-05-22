import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const frontendDir = join(__dirname, '../../frontend');

app.get('/', (req, res) => {
  res.sendFile(join(frontendDir, 'testchat.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});