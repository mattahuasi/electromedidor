<template>
  <div></div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

<!-- <script setup>
import { getReadingsRequest } from "@/api/reading";
import { fullDateFormat, dateFormat, hourFormat } from "@/utils/index";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";
import * as echarts from "echarts";

const route = useRoute();
const items = ref([]);
const line = ref(null);
const data = ref([]);
const categories = ref([]);
const interval = ref();

onMounted(async () => {
  try {
    const res = await getReadingsRequest(route.query.id);
    items.value = res.data;
  } catch (error) {
    toast.error("Error al cargar datos");
  }
  items.value.splice(0, items.value.length - 20);
  items.value.forEach((item) => {
    data.value.push(item.power);
  });
  items.value.forEach((item) => {
    categories.value.push(hourFormat(item.createdAt));
  });
  if (line.value !== null) {
    const echart = echarts.init(line.value, null, {
      width: 1024,
      height: 500,
    });
    echart.setOption({
      title: {
        text: "Distribution of Electricity",
        subtext: "Fake Data",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: categories.value,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} W",
        },
        axisPointer: {
          snap: true,
        },
      },
      series: [
        {
          name: "Electricity",
          type: "line",
          smooth: true,
          data: data.value,
        },
      ],
    });
    interval = setInterval(async function () {
      const items = ref([]);
      try {
        const res = await getReadingsRequest(route.query.id);
        items.value = res.data;
        data.value.shift();
        data.value.push(items.value[items.value.length - 1].power);
        categories.value.shift();
        categories.value.push(
          hourFormat(items.value[items.value.length - 1].createdAt)
        );
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
      } catch (error) {
        toast.error("Error al cargar datos");
      }
    }, 5100);
  }
});

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <div ref="line"></div>
</template> -->
