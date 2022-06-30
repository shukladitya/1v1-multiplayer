namePara = document.querySelector(".name p");

if (!localStorage.getItem("username")) {
  userName = generateName();
  localStorage.setItem("username", userName);
} else userName = localStorage.getItem("username");

namePara.innerText = `Your name: ${userName}`;
document.querySelector(".newName").value = userName;

//------edit name
changeNameBtn = document.querySelector(".changeNameBtn");
changeNameBtn.addEventListener("click", () => {
  document.querySelector(".menuScaffold").style.display = "none";
  document.querySelector(".changeName").style.display = "flex";
});

document.querySelector(".reloadName").addEventListener("click", () => {
  userName = generateName();
  namePara.innerText = `Your name: ${userName}`;
  document.querySelector(".newName").value = userName;
  localStorage.setItem("username", userName);
  link.innerText = `${host}/${userName}`;
});

document.querySelector(".newName").addEventListener("keyup", (e) => {
  namePara.innerText = `Your name: ${e.target.value}`;
  localStorage.setItem("username", e.target.value);
  link.innerText = `${host}/${e.target.value}`;
});

document.querySelector(".submitBtn").addEventListener("click", () => {
  document.querySelector(".menuScaffold").style.display = "block";
  document.querySelector(".changeName").style.display = "none";
  socket.emit("createRoom", { id: userName, player: player.spriteNumber }); //send request to create a new room
});

document.querySelector(".startBtnHover").addEventListener("click", () => {
  document.querySelector(".menu").style.display = "none";
  animate();
});

//selecting player-----------------

availabeFighters = document.querySelectorAll(".playerImage");
availabeFighters.forEach((element) => {
  if (element.classList[1][1] == playerSprite) {
    element.style.border = "1rem solid #ce1d39";
    element.innerText = "P1";
  }
  element.addEventListener("click", () => {
    availabeFighters.forEach((ele) => {
      ele.style.border = "none";
      ele.innerText = "";
    });
    element.style.border = "1rem solid #ce1d39";
    element.innerText = "P1";
    player.spriteNumber = element.classList[1][1];
    localStorage.setItem("playerNumber", element.classList[1][1]);
    if (enemySprite == element.classList[1][1]) {
      enemy.spriteNumber = ((enemy.spriteNumber + 1) % 3) + 1;
    }
  });
});

//creating the shareable link
host = "http://localhost:3500";
link = document.querySelector(".link");
link.innerText = `${host}/${userName}`;
//creating copy btn
document.querySelector(".linkCopy").addEventListener("click", () => {
  navigator.clipboard.writeText(link.innerText);
  addNotification("Link copied");
});

document.querySelector(".whatsappBtn").addEventListener("click", () => {
  window.open(`whatsapp://send?text=${link.innerText}`, "_blank");
  addNotification("Link copied");
});

//
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
roomCode = urlParams.get("roomCode");
roomFull = urlParams.get("roomFull");
if (roomCode != null && roomFull == "false") {
  youAre = "accepter";

  linkShare = document.querySelector(".linkShare");
  linkShare.innerHTML = `<div>Accepted challenge from&nbsp<b>${roomCode}</b></div>`;
} else if (roomCode != null && roomFull == "true") {
  document.querySelector(
    ".notification p"
  ).innerText = `${roomCode} already in a match; Room full.`;
  document.querySelector(".notification p").classList.add("moveNotification");
  setTimeout(() => {
    document
      .querySelector(".notification p")
      .classList.remove("moveNotification");
  }, 2000);
}
