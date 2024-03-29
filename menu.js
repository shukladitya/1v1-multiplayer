//meta tags
// titleMeta = document.querySelector("#titleMeta");
// descriptionMeta = document.querySelector("#descriptionMeta");
// imageMeta = document.querySelector("#imageMeta");
//meta tags
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
  writtenNameArray = e.target.value.split(" ");
  writtenName = writtenNameArray.join("_");
  namePara.innerText = `Your name: ${writtenName}`;
  localStorage.setItem("username", writtenName);
  link.innerText = `${host}/${writtenName}`;
});

document.querySelector(".submitBtn").addEventListener("click", () => {
  document.querySelector(".menuScaffold").style.display = "block";
  document.querySelector(".changeName").style.display = "none";
  socket.emit("createRoom", { id: userName, player: player.spriteNumber }); //send request to create a new room
});

document.querySelector(".startBtnHover").addEventListener("click", () => {
  document.querySelector(".menu").style.display = "none";
  if (youAre == "accepter") {
    socket.emit("accepterStarted", player.spriteNumber);
  }
  timer();
  restart(player.spriteNumber, enemy.spriteNumber);
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
host = "https://onev1-backend.onrender.com";
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
  {
    youAre = "accepter";
    acceptersName = roomCode;
  }

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
