import { loginRequest, verifyTokenRequest, logoutRequest } from "@/api/auth";
import { defineStore } from "pinia";
import Cookies from "js-cookie";
import mqtt from "mqtt";

export const useProfileStore = defineStore("profile", {
  state: () => ({ user: {}, isAuthenticated: false, mqttClient: null }),

  getters: {
    dataUser: (state) => ({
      firstName: state.user.user?.firstName,
      lastName: state.user.user?.lastName,
      ci: state.user.user?.ci,
      phone: state.user.user?.phone,
      email: state.user.user?.email,
    }),
    fullName: (state) =>
      state.user.user?.firstName + " " + state.user.user?.lastName,
    isStaff: (state) => state.user.user?.staff,
    isAdmin: (state) => state.user.user?.admin,
  },

  actions: {
    async verifyToken() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        this.user = {};
        this.isAuthenticated = false;
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);

        if (!res.data) {
          this.user = {};
          this.isAuthenticated = false;
          return;
        }

        this.user = res.data;
        this.isAuthenticated = true;
      } catch (error) {
        this.user = {};
        this.isAuthenticated = false;
        throw error;
      }

      this.mqttClient = mqtt.connect(import.meta.env.VITE_MQTT_HOST, {
        username: import.meta.env.VITE_MQTT_USERNAME,
        password: import.meta.env.VITE_MQTT_PASSWORD,
      });

      this.mqttClient.on("error", (error) => {
        console.log(error);
        this.mqttClient.end();
      });

      this.mqttClient.on("connect", () => {
        console.log("MQTT client has connected.");
      });

      this.mqttClient.on("close", () => {
        "MQTT client has been disconnected. Attempting to reconnect...";
        this.mqttClient.reconnect();
      });
    },

    async login(email, password) {
      try {
        const res = await loginRequest(email, password);
        Cookies.set("token", res.data.token, { expires: 1 });
        this.user = res.data;
        this.isAuthenticated = true;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        Cookies.remove("token");
        await logoutRequest();
        this.user = {};
        this.isAuthenticated = false;
      } catch (error) {
        throw error;
      }
    },
  },
});
