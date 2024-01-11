import { getHardwareMQTT } from "./controllers/hardware.controller.js";
import { createReadingMQTT } from "./controllers/reading.controller.js";
import { Server } from "socket.io";
import mqtt from "mqtt";

const webSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  const mqttOptions = {
    host: "3ee15d0a582046d2b93b187b50001048.s2.eu.hivemq.cloud",
    port: "8883",
    protocol: "mqtts",
    username: "username",
    password: "helloworld",
  };
  const mqttClient = mqtt.connect(mqttOptions);
  mqttClient.on("connect", () => {
    console.log("MQTT client has connected.");
    subscribe();
  });
  mqttClient.on("error", (error) => {
    console.log(error);
    mqttClient.end();
  });
  // mqttClient.publish(publish, res);
  const subscribe = async () => {
    const res = await getHardwareMQTT();
    res.forEach((hardware) => {
      const name = hardware.dataValues.name;
      mqttClient.subscribe(`medidor/${name}`, { qos: 0 });
    });
  };
  setInterval(subscribe, 5 * 6 * 1000);
  mqttClient.on("message", async function (topic, message) {
    // console.log("Name: " + topic);
    // console.log(message.toString());
    const topicVector = topic.toString().split("/");
    const name = topicVector[1].trim();
    let reading = message.toString();
    reading = JSON.parse(reading);
    await createReadingMQTT(name, reading);
  });
  mqttClient.on("close", () => {
    console.log("MQTT client disconnected.");
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);
  });

  // io.on("connection", (socket) => {
  //   console.log(socket.id);
  //   socket.emit("mqtt", () => {
  //     mqttClient.on("message", async function (topic, message) {
  //       let data = message.toString();
  //       data = JSON.parse(data);
  //       console.log(data);
  //     });
  //   });
  // });
};

export default webSocket;
