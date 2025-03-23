// In app/sockets/SocketHandler.js
export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("newTicket", (ticketData) => {
      console.log("New ticket received via socket:", ticketData);
      io.emit("ticketCreated", ticketData);
    });

    socket.on("chatMessage", (msg) => {
      console.log("Chat message received:", msg);
      io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
