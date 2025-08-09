import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server,{
      cors:{
      origin:"*",
      methods:["GET", "POST"],
      allowHeaders:["*"],
      credentials:true
  }

});

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify others in the room
      connections[path].forEach((socketId) => {
        io.to(socketId).emit("user-joined", socket.id, connections[path]);
      });

      // Send past messages if any
      if (messages[path]) {
        messages[path].forEach((msg) => {
          io.to(socket.id).emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg["socket-id-sender"]
          );
        });
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      // Find room of the sender
      let matchingRoom = "";
      for (const [roomKey, sockets] of Object.entries(connections)) {
        if (sockets.includes(socket.id)) {
          matchingRoom = roomKey;
          break;
        }
      }

      if (matchingRoom) {
        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          data,
          sender,
          "socket-id-sender": socket.id,
        });

        // Broadcast to all in the room
        connections[matchingRoom].forEach((sockId) => {
          io.to(sockId).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      const timeSpent = Math.abs(new Date() - timeOnline[socket.id]);

      for (const [roomKey, sockets] of Object.entries(connections)) {
        const index = sockets.indexOf(socket.id);
        if (index !== -1) {
          sockets.splice(index, 1);

          sockets.forEach((sockId) => {
            io.to(sockId).emit("user-left", socket.id);
          });

          if (sockets.length === 0) {
            delete connections[roomKey];
          }

          break;
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};
