import { getHardwareMQTT } from "./controllers/hardware.controller.js";
import { createReadingMQTT } from "./controllers/reading.controller.js";
import mqtt from "mqtt";

class mqttHandler {
  constructor() {
    this.client = null;
    this.options = {
      host: "3ee15d0a582046d2b93b187b50001048.s2.eu.hivemq.cloud",
      port: "8883",
      protocol: "mqtts",
      username: "username",
      password: "helloworld",
    };
    this.client = mqtt.connect(this.options);
  }
  connect() {
    this.client.on("error", (error) => {
      console.log(error);
      this.client.end();
    });
    this.client.on("connect", () => {
      console.log("MQTT client has connected.");
      subscribe();
    });
    const subscribe = async () => {
      const res = await getHardwareMQTT();
      res.forEach((hardware) => {
        const name = hardware.dataValues.name;
        this.client.subscribe(`medidor/${name}`, { qos: 0 });
      });
    };
    // setInterval(subscribe, 5 * 6 * 1000);
    this.client.on("message", async function (topic, message) {
      const topicVector = topic.toString().split("/");
      const name = topicVector[1].trim();
      let reading = message.toString();
      reading = JSON.parse(reading);
      await createReadingMQTT(name, reading);
      // this.client.publish(topic, message);
    });
    this.client.on("close", () => {
      console.log("MQTT client disconnected.");
    });
  }
}

export default mqttHandler;
