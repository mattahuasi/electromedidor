// import { getHardwareByIdRequest } from "@/api/hardware";
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
//   subscribe();
});

// const subscribe = (name) => {
//   mqttClient.subscribe(`medidor/${name}`, { qos: 0 });
// };

// const publish = async (id, arg) => {
//   const res = await getHardwareByIdRequest(id);
//   const hardware = res.data;
//   const name = hardware.name;
//   console.log(name);
//   mqttClient.publish(`medidor/${name}`, arg);
// };

mqttClient.on("message", async function (topic, message) {
  console.log("Topic", topic);
  console.log(message.toString());
  messages.value.push(message.toString());
});

mqttClient.on("close", () => {
  console.log("MQTT client disconnected.");
  connected.value = false;
});

export default mqttClient;
