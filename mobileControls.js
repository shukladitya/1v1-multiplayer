left = document.querySelector(".leftBtn");
right = document.querySelector(".rightBtn");
topBtn = document.querySelector(".upBtn");
action = document.querySelector(".actionBtn");

left.addEventListener("touchstart", (e) => {
  keyPressed.a = true;
  left.style.opacity = "10";
  if (youAre == "challenger" || youAre == "accepter") {
    doNetworkMovement("keydown", "a", youAre);
  }
});

left.addEventListener("touchend", (e) => {
  keyPressed.a = false;
  left.style.opacity = "0.6";
  doNetworkMovement("keyup", "a", youAre);
});

right.addEventListener("touchstart", (e) => {
  keyPressed.d = true;
  right.style.opacity = "10";
  doNetworkMovement("keydown", "d", youAre);
});

right.addEventListener("touchend", (e) => {
  keyPressed.d = false;
  right.style.opacity = "0.6";
  doNetworkMovement("keyup", "d", youAre);
});

topBtn.addEventListener("touchstart", (e) => {
  if (!player.isDead) player.jump();
  doNetworkMovement("keydown", "w", youAre);
  topBtn.style.opacity = "10";
  setTimeout(() => {
    topBtn.style.opacity = "0.6";
  }, 100);
});

action.addEventListener("touchstart", (e) => {
  if (!player.isDead) player.attacking();
  doNetworkMovement("keydown", " ", youAre);
  action.style.opacity = "10";
  setTimeout(() => {
    action.style.opacity = "0.6";
  }, 100);
});
