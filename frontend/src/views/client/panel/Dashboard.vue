<script setup>
import { getCustomerHardwareRequest } from "@/api/customer";
import { ref, onMounted } from "vue";
import { toast } from "vue-sonner";
import * as echarts from "echarts";

const pie = ref(null);
const items = ref([]);
const activates = ref(0);
const deactivates = ref(0);

onMounted(async () => {
  try {
    const res = await getCustomerHardwareRequest(2);
    items.value = res.data;
    items.value.forEach((item) => {
      if (item.key) activates.value++;
      else deactivates.value++;
    });
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
  if (pie.value !== null) {
    const echart = echarts.init(pie.value, "dark");
    echart.setOption({
      grid: {
        containLabel: true,
      },
      title: {
        text: "Total medidores",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Medidores",
          type: "pie",
          radius: "50%",
          data: [
            { value: activates.value, name: "Activados" },
            { value: deactivates.value, name: "Desactivados" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  }
});
</script>

<template>
  <div
    class="flex flex-wrap justify-center items-center bg-gray-200 dark:bg-gray-800 m-4 p-6 rounded-lg shadow-lg"
  >
    <div
      ref="pie"
      class="bg-gray-100 dark:bg-gray-700 w-full h-96 m-4 rounded-lg border-2 shadow-lg border-gray-100 dark:border-gray-700"
    ></div>
  </div>
</template>
