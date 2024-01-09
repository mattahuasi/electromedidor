<script setup>
import { ref, onMounted } from "vue";
import { fullDateFormat } from "@/utils/index";
import * as echarts from "echarts";

const props = defineProps({
  title: { type: String, default: "Title" },
  items: { type: Array, required: true },
});

console.log(props.title);
console.log(props.items);

const line = ref(null);
const data = ref([]);
const categories = ref([]);

onMounted(() => {});
</script>

<template>
  <div ref="line"></div>
</template>

<!-- <script setup>
import { getReadingsRequest } from "@/api/reading.js";
import { ref, onMounted } from "vue";
import { fullDateFormat } from "@/utils/index.js";
import * as echarts from "echarts";

const items = ref([]);

const line = ref(null);

const data = ref([]);
const categories = ref([]);

onMounted(async () => {
  try {
    const res = await getReadingsRequest(10);
    items.value = res.data;
    console.log(items.value);
    items.value.forEach((item) => {
      data.value.push(item.power);
      const localTime = new Date(item.createdAt);
      categories.value.push(localTime.toLocaleTimeString());
    });
    console.log(data.value);
    console.log(categories.value);
  } catch (error) {
    console.error(error);
  }
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
        // prettier-ignore
        // data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
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
      /* visualMap: {
        show: false,
        dimension: 0,
        pieces: [
          {
            lte: 6,
            color: "green",
          },
          {
            gt: 6,
            lte: 8,
            color: "red",
          },
          {
            gt: 8,
            lte: 14,
            color: "green",
          },
          {
            gt: 14,
            lte: 17,
            color: "red",
          },
          {
            gt: 17,
            color: "green",
          },
        ],
      }, */
      series: [
        {
          name: "Electricity",
          type: "line",
          smooth: true,
          // prettier-ignore
          // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          data: data.value,
          /* markArea: {
            itemStyle: {
              color: "rgba(255, 173, 177, 0.4)",
            },
            data: [
              [
                {
                  name: "Morning Peak",
                  xAxis: "07:30",
                },
                {
                  xAxis: "10:00",
                },
              ],
              [
                {
                  name: "Evening Peak",
                  xAxis: "17:30",
                },
                {
                  xAxis: "21:15",
                },
              ],
            ],
          }, */
        },
      ],
    });
  }
});
</script>

<template>
  <div ref="line"></div>
</template> -->
