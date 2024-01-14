<script setup>
import { getHardwareRequest } from "@/api/hardware";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { toast } from "vue-sonner";

const line = ref(null);
const items = ref([]);
const activates = ref(0);
const deactivates = ref(0);

onMounted(async () => {
  try {
    const res = await getHardwareRequest();
    items.value = res.data;
    console.log(items.value);
    items.value.forEach((item) => {
      console.log(item);
      if (item.key) activates.value++;
      else deactivates.value++;
    });
  } catch (error) {
    toast.error("Error al cargar datos");
  }
  if (line.value !== null) {
    const echart = echarts.init(line.value, null, {
      width: 1024,
      height: 500,
    });
    echart.setOption({
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
  <div ref="line"></div>
</template>
