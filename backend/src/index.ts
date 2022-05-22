import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { Server } from "socket.io";
import routes from './routes';

const chat = express()
chat.use(cors());
chat.use(routes);

const server = http.createServer(chat);

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ["Bate Papo"],
      credentials: true
    }
})

io.on("connection", (socket) => {
    console.log(`Usuário Conectado: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`Usuário com o ID: ${socket.id} entrou na sala: ${data}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message",data);
    });

    socket.on("disconnect", () =>{
        console.log(`Usuário desconectado: ${socket.id}`);
    });

});

server.listen(3001, () => {
    console.log('Servidor Ligado.');
  });
