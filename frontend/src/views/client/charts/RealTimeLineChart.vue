<script setup>
import { getOneHardwareRequest } from "@/api/hardware";
import { getLastReadingsRequest } from "@/api/reading";
import { useProfileStore } from "@/stores/profile";
import { hourFormat, getCurrentHour } from "@/utils/index";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";
import * as echarts from "echarts";

const route = useRoute();
const useProfile = useProfileStore();
const mqttClient = ref(useProfile.mqttClient);
const readings = ref([]);
const hardwareName = ref("");
const line = ref(null);
const data = ref([]);
const categories = ref([]);

onMounted(async () => {
  let echart = null;
  if (route.query.id) {
    try {
      const res = await getOneHardwareRequest(route.query.id);
      hardwareName.value = res.data.name;
      mqttClient.value.subscribe(`server/medidor/${hardwareName.value}`, {
        qos: 0,
      });
      toast.info(
        `¡Te has suscrito al medidor "${hardwareName.value}" exitosamente!`
      );
    } catch (error) {
      toast.error(
        "Se produjo un error al cargar los datos. Por favor, verifica tu conexión e inténtalo nuevamente."
      );
    }
    try {
      const res = await getLastReadingsRequest(route.query.id);
      readings.value = res.data;
      readings.value.forEach((reading) => {
        data.value.push(reading.consumption);
      });
      readings.value.forEach((reading) => {
        categories.value.push(hourFormat(reading.createdAt));
      });
    } catch (error) {
      toast.error(
        "Se produjo un error al cargar los datos. Por favor, verifica tu conexión e inténtalo nuevamente."
      );
    }
  }
  if (line.value !== null) {
    echart = echarts.init(line.value, "dark");
    echart.setOption({
      grid: {
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: categories.value,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data.value,
          type: "line",
          smooth: true,
        },
      ],
    });
    mqttClient.value.on("message", function (topic, message) {
      let reading = message.toString();
      reading = JSON.parse(reading);

      categories.value.shift();
      categories.value.push(getCurrentHour());

      data.value.shift();
      data.value.push(reading.consumo);

      echart.setOption({
        xAxis: [
          {
            data: categories.value,
          },
        ],
        series: [
          {
            data: data.value,
          },
        ],
      });
    });
  }
});
</script>

<template>
  <div
    class="flex flex-wrap justify-center items-center bg-gray-200 dark:bg-gray-800 m-4 p-6 rounded-lg shadow-lg"
  >
    <div
      ref="line"
      class="bg-gray-100 dark:bg-gray-700 w-full h-96 m-4 rounded-lg border-2 shadow-lg border-gray-100 dark:border-gray-700"
    ></div>
  </div>
</template>
