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
