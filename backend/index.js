const app = require("express")();
var cors = require("cors");
const http = require("http").Server(app);
const querystring = require("querystring");

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "*" }));

app.get("/:roomCode", function (req, res) {
  roomFull = false;
  if (roomDetails[req.params.roomCode].accepterName != null) {
    roomFull = true;
  }
  const query = querystring.stringify({
    roomCode: req.params.roomCode,
    roomFull,
    // valid: "your string here",
  });
  res.redirect("http://localhost:5500/1v1-multiplayer/?" + query);
});

let roomDetails = {};

io.on("connection", (socket) => {
  socket.emit("connected", "welcome to 1v1-multiplayer");

  socket.on("createRoom", (newRoom) => {
    //roomCode={id:"",player:spritenumber}

    console.log("creatingRoom: " + newRoom.id);
    roomDetails[newRoom.id] = { challengerSprite: newRoom.id };
    socket.join(newRoom.id);
  });

  socket.on("joinRoom", (joinRoom) => {
    console.log("joiningRoom: " + joinRoom.id);
    socket.join(joinRoom.id);
    roomDetails[joinRoom.id] = { accepterName: joinRoom.accepterName };
    socket.to(joinRoom.id).emit("challengeAccepted", joinRoom.accepterName);
  });
  socket.on("joinRoom", (joinRoom) => {
    console.log("joiningRoom: " + joinRoom.id);
    socket.join(joinRoom.id);
    roomDetails[joinRoom.id] = { accepterName: joinRoom.accepterName };
    socket.to(joinRoom.id).emit("challengeAccepted", joinRoom.accepterName);
  });
  socket.on("movement", (movement) => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("movement", movement);
    });
  });
  socket.on("accepterStarted", (accepterSprite) => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("accepterStarted", accepterSprite);
    });
  });
  socket.on("gameRestarted", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("gameRestarted");
    });
  });
});

http.listen(process.env.PORT, function () {
  console.log("listening on *:3500");
});
