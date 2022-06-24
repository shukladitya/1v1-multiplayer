left = document.querySelector(".leftBtn");
right = document.querySelector(".rightBtn");
topBtn = document.querySelector(".upBtn");
action = document.querySelector(".actionBtn");

left.addEventListener("mousedown", (e) => {
  keyPressed.a = true;
  left.style.opacity = "10";
});

left.addEventListener("mouseup", (e) => {
  keyPressed.a = false;
  left.style.opacity = "0.6";
});

right.addEventListener("mousedown", (e) => {
  keyPressed.d = true;
  right.style.opacity = "10";
});

right.addEventListener("mouseup", (e) => {
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
