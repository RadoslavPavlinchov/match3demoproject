const io = require("socket.io")();

// console.log("io", io)

io.on("connection", client => {
    client.emit("init", { data: "server says hello" })
});

io.listen(3000);