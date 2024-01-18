import { ref } from "vue";
import mqtt from "mqtt";

const connected = ref(false);
const options = {
  username: import.meta.env.VITE_MQTT_USERNAME,
  password: import.meta.env.VITE_MQTT_PASSWORD,
};
const mqttClient = mqtt.connect(import.meta.env.VITE_MQTT_BASEURL, options);
const messages = ref([]);

mqttClient.on("error", (error) => {
  console.log(error);
  mqttClient.end();
});

mqttClient.on("connect", () => {
  console.log("MQTT client has connected.");
  connected.value = true;
});

mqttClient.on("message", function (topic, message) {
  console.log("Topic", topic);
  console.log(message.toString());
  messages.value.push(message.toString());
});

mqttClient.on("close", () => {
  console.log("MQTT client disconnected. Trying to reconnect...");
  mqttClient.reconnect();
  connected.value = false;
});

export default mqttClient;
