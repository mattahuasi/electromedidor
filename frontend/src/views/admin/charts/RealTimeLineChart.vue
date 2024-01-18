<script setup></script>

<template>
  <div></div>
</template>

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
    const echart = echarts.init(line.value, 'dark', {
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

<!-- <script setup>
import { getReadingsDatesRequest, getReadingsDayRequest } from "@/api/reading";
import { fullDateFormat, hourFormat } from "@/utils/index";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";
import * as echarts from "echarts";
import Select from "@/components/inputs/Select.vue";

const route = useRoute();
const date = ref("2024-01-12");
const dates = ref([]);
const errors = ref([]);
const items = ref([]);
const line = ref(null);
const categories = ref([]);
const data = ref([]);

async function loadData() {
  try {
    const res = await getReadingsDatesRequest(route.query.id);
    dates.value = res.data;
  } catch (error) {
    toast.error("Error al cagar las fechas");
  }
}

watch(
  () => date.value,
  async (date) => {
    categories.value.length = 0;
    data.value.length = 0;
    console.log(date);
    // try {
    //   const res = await getReadingsDayRequest(route.query.id, date);
    //   items.value = res.data;
    //   items.value.forEach((item) => {
    //     categories.value.push(hourFormat(item.createdAt));
    //     data.value.push(item.power);
    //   });
    //   console.log({ data: data.value, categories: categories.value });
    // } catch (error) {
    //   toast.error("Error al cagar las datos");
    // }
  }
);

const chart = (categories, data) => {
  if (line.value !== null) {
    const echart = echarts.init(line.value, "dark", {
      width: 1024,
      height: 500,
    });
    console.log("ECharts initialized:", echart);
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
        data: categories,
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
          data: data,
        },
      ],
    });
  }
};

async function handleSubmit(event) {
  event.preventDefault();
  categories.value.length = 0;
  data.value.length = 0;
  console.log(categories.value, data.value);
  try {
    const res = await getReadingsDayRequest(route.query.id, date.value);
    items.value = res.data;
    items.value.forEach((item) => {
      categories.value.push(hourFormat(item.createdAt));
      data.value.push(item.power);
    });
    console.log({ data: data.value, categories: categories.value });
  } catch (error) {
    toast.error("Error al cagar las datos");
  }
  chart(categories.value, data.value);
}

onMounted(async () => {
  loadData();

  // try {
  //   const res = await getReadingsDayRequest(route.query.id, date.value);
  //   items.value = res.data;
  //   items.value.forEach((item) => {
  //     categories.value.push(hourFormat(item.createdAt));
  //     data.value.push(item.power);
  //   });
  //   console.log({ data: data.value, categories: categories.value });
  // } catch (error) {
  //   toast.error("Error al cagar las datos");
  // }

  console.log({ data: data.value, categories: categories.value });
});
</script>

<template>
  <Select
    id="dates"
    labelText="Fechas"
    v-model="date"
    :errors="errors"
    name="createdAt"
    :options="dates"
  />
  <form :onSubmit="handleSubmit">
    <button type="submit">Submit</button>
  </form>
  <div ref="line"></div>
</template> -->

<!-- <script setup>
import { getReadingsRequest } from "@/api/reading";
import { dateFormat, hourFormat } from "@/utils/index";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";
import * as echarts from "echarts";
import LineChart from "@/components/charts/LineChart.vue";

const route = useRoute();
const date = ref();
const items = ref([]);
const itemsDisplay = ref([]);
const powerChart = ref(null);
const categories = ref([]);
const power = ref([]);
const voltage = ref([]);
const current = ref([]);
const powerFactor = ref([]);
const consumption = ref([]);

async function loadData() {
  try {
    const res = await getReadingsRequest(route.query.id);
    items.value = res.data;
    itemsDisplay.value = items.value;
    categories.value = [];
    items.value.forEach((item) => {
      if (date.value === dateFormat(item.createdAt)) {
        categories.value.push(hourFormat(item.createdAt));
        power.value.push(item.power);
        voltage.value.push(item.voltage);
        current.value.push(item.current);
        powerFactor.value.push(item.powerFactor);
        consumption.value.push(item.consumption);
      }
    });
  } catch (error) {
    toast.error("Error al cargar datos");
  }
}

watch(
  () => date.value,
  (value) => {
    console.log(value);
    // loadData(value);
    // console.log(categories.value);
  }
);

onMounted(async () => {
  try {
    const res = await getReadingsRequest(route.query.id);
    items.value = res.data;
    itemsDisplay.value = items.value;
    items.value.forEach((item) => {
      // if (date.value === dateFormat(item.createdAt)) {
      categories.value.push(hourFormat(item.createdAt));
      power.value.push(item.power);
      voltage.value.push(item.voltage);
      current.value.push(item.current);
      powerFactor.value.push(item.powerFactor);
      consumption.value.push(item.consumption);
      // }
    });
  } catch (error) {
    toast.error("Error al cargar datos");
  }
  if (powerChart.value !== null) {
    const echart = echarts.init(powerChart.value, null, {
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
          data: power.value,
        },
      ],
    });
  }
});
</script>

<template>
  <input type="date" id="date" v-model="date" />
  <div ref="powerChart"></div>
</template> -->

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
