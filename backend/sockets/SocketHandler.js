// backend/sockets/socketHandler.js
export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for new tickets created from the client
    socket.on("newTicket", (ticketData) => {
      // Emit event to all clients about the new ticket
      io.emit("ticketCreated", ticketData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
