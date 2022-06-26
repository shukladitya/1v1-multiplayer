const socket = io("http://localhost:3500");

socket.on("connected", (data) => {
  console.log(data);
});
