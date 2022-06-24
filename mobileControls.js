left = document.querySelector(".leftBtn");
right = document.querySelector(".rightBtn");
topBtn = document.querySelector(".upBtn");
action = document.querySelector(".actionBtn");

left.addEventListener("touchstart", (e) => {
  keyPressed.a = true;
  left.style.opacity = "10";
});

left.addEventListener("touchend", (e) => {
  keyPressed.a = false;
  left.style.opacity = "0.6";
});

right.addEventListener("touchstart", (e) => {
  keyPressed.d = true;
  right.style.opacity = "10";
});

right.addEventListener("touchend", (e) => {
  keyPressed.d = false;
  right.style.opacity = "0.6";
});

topBtn.addEventListener("mousedown", (e) => {
  if (!player.isDead) player.jump();
  topBtn.style.opacity = "10";
  setTimeout(() => {
    topBtn.style.opacity = "0.6";
  }, 100);
});

action.addEventListener("mousedown", (e) => {
  if (!player.isDead) player.attacking();
  action.style.opacity = "10";
  setTimeout(() => {
    action.style.opacity = "0.6";
  }, 100);
});
