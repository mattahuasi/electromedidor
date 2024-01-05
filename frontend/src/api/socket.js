import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("mqtt", (value) => {
    console.log(value);
  });

export default socket;
