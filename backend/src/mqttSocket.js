import { Server } from "socket.io";
import { createReading } from "./controllers/reading.controller.js";
import mqtt from "mqtt";

const webSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  // io.on("connection", (socket) => {
  //   console.log(socket.id);
  //   socket.emit("mqtt", () => {
  //     client.on("message", async function (topic, message) {
  //       let data = message.toString();
  //       data = JSON.parse(data);
  //       console.log(data);
  //     });
  //   });
  // });

  // const client = mqtt.connect("mqtt://localhost:1883");
  const client = mqtt.connect("mqtt://192.168.0.160:1883");

  client.on("connect", () => {
    console.log("MQTT client has connected.");
    subscribe();
  });
  client.on("error", (error) => {
    console.log(error);
    client.end();
  });
  const subscribe = async () => {
    client.subscribe("outTopic", { qos: 0 });
  };
  client.on("message", async function (topic, message) {
    let data = message.toString();
    data = JSON.parse(data);
    await createReading("DEFh3456", data);
    // console.log(data);
    // io.on("connection", (socket) => {
    //   console.log(socket.id);
    //   socket.emit("mqtt", data);
    // });
  });
  client.on("close", () => {
    console.log("MQTT client disconnected.");
  });
};

export default webSocket;
