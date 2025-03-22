export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("newTicket", (ticketData) => {
      // Broadcast the new ticket to all connected clients
      io.emit("ticketCreated", ticketData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
