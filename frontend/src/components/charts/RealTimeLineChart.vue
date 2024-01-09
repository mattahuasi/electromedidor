<script setup>
import { ref, onMounted } from "vue";
import { getReadingsRequest } from "@/api/reading";
import * as echarts from "echarts";

const items = ref([]);

const line = ref(null);

const data = ref([]);
const categories = ref([]);

async function loadData() {
  try {
    const res = await getReadingsRequest(10);
    items.value = res.data;
    console.log(items.value);
  } catch (error) {
    console.error(error);
  }
}

const categories2 = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
    now = new Date(+now - 5000);
  }
  return res;
})();

const data2 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();

onMounted(async () => {
  // loadData();
  if (line.value !== null) {
    const echart = echarts.init(line.value, null, {
      width: 600,
      height: 400,
    });
    echart.setOption({
      title: {
        text: "Dynamic Data",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56",
          },
        },
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: categories2,
        },
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "Order",
          max: 20,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: "Dynamic Line",
          type: "line",
          data: data2,
        },
      ],
    });
    setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
      data2.shift();
      data2.push(+(Math.random() * 10 + 5).toFixed(1));
      categories2.shift();
      categories2.push(axisData);
      echart.setOption({
        xAxis: [
          {
            data: categories2,
          },
        ],
        series: [
          {
            data: data2,
          },
        ],
      });
    }, 5100);
  }
});
</script>

<template>
  <div ref="line"></div>
</template>
