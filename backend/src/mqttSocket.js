import mqtt from "mqtt";
import { Server } from "socket.io";

const webSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  const client = mqtt.connect("mqtt://localhost:1883");
  client.on("connect", () => {
    console.log("MQTT client has connected.");
    subscribe();
  });
  client.on("error", (error) => {
    console.log(error);
    client.end();
  });
  const subscribe = async () => {
    client.subscribe("topic", { qos: 0 });
  };
  client.on("message", async function (topic, message) {
    console.log(topic, message);
    let data = message.toString();
    data = JSON.parse(data);

    io.on("connection", (socket) => {
      console.log(socket.id);
    });

    console.log(data);
  });
  client.on("close", () => {
    console.log("MQTT client disconnected.");
  });
};

export default webSocket;
