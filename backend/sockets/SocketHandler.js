export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("newTicket", (ticketData) => {
      io.emit("ticketCreated", ticketData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
