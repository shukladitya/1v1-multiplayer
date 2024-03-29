socket = io("https://onev1-backend.onrender.com/");

addNotification = (notificationText) => {
  document.querySelector(".notification p").innerText = notificationText;
  document.querySelector(".notification p").classList.add("moveNotification");
  setTimeout(() => {
    document
      .querySelector(".notification p")
      .classList.remove("moveNotification");
  }, 2000);
};

socket.on("connected", (data) => {
  if (roomCode == null)
    socket.emit("createRoom", { id: userName, player: player.spriteNumber });
  else socket.emit("joinRoom", { id: roomCode, accepterName: userName });
});

acceptersName = "player 2";
socket.on("challengeAccepted", (accepterName) => {
  youAre = "challenger";
  addNotification(`${accepterName} joined the match.`);
  acceptersName = accepterName;
});

socket.on("accepterStarted", (accepterSprite) => {
  restart(player.spriteNumber, accepterSprite);
});
socket.on("gameRestarted", () => {
  restart(player.spriteNumber, enemy.spriteNumber);
  restartBtn.style.display = "none";
});

socket.on("movement", (movementInfo) => {
  if (movementInfo.keyEvent == "keydown") {
    if (movementInfo.keyName == "a") keyPressed.keyRight = true;
    if (movementInfo.keyName == "d") keyPressed.keyLeft = true;
    if (movementInfo.keyName == "w" && !enemy.isDead) enemy.jump();
    if (movementInfo.keyName == " " && !enemy.isDead) enemy.attacking();
  }
  if (movementInfo.keyEvent == "keyup") {
    if (movementInfo.keyName == "a") keyPressed.keyRight = false;
    if (movementInfo.keyName == "d") keyPressed.keyLeft = false;
  }
});

doNetworkMovement = (keyEvent, keyName, youAre) => {
  socket.emit("movement", { keyEvent, keyName, youAre });
};
