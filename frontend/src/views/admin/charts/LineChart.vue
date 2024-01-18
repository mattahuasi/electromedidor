<script setup>
import { getReadingsDatesRequest } from "@/api/reading";
import { hourFormat, dateFormat } from "@/utils/index";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";
import * as echarts from "echarts";
import Select from "@/components/inputs/Select.vue";

const route = useRoute();
const items = ref([]);
const dates = ref([]);
const errors = ref([]);
const date = ref("");
const line = ref(null);

async function handleSubmit(e) {
  e.preventDefault();
  const categories = ref([]);
  const data = ref([]);
  if (route.query.id) {
    try {
      const res = await getReadingsDatesRequest(route.query.id);
      items.value = res.data;
      const consumption = items.value.consumption;
      consumption.forEach((element) => {
        if (date.value === dateFormat(element.createdAt)) {
          categories.value.push(hourFormat(element.createdAt));
          data.value.push(element.consumption);
        }
      });
      console.log(categories.value);
      console.log(data.value);
    } catch (error) {
      toast.error("Error al cargar datos");
    }
    if (line.value !== null && categories.value.length !== 0) {
      const echart = echarts.init(line.value, "dark");
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
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getReadingsDatesRequest(route.query.id);
      items.value = res.data;
      dates.value = items.value.dates;
    } catch (error) {
      toast.error("Error al cargar datos");
    }
  }
});
</script>

<template>
  <div
    class="flex flex-wrap justify-center items-center bg-gray-200 dark:bg-gray-800 m-4 p-6 rounded-lg shadow-lg"
  >
    <form class="w-full mt-2" :onSubmit="handleSubmit">
      <div class="flex flex-wrap justify-between items-center">
        <div class="w-full lg:w-6/12 px-4">
          <Select
            id="date"
            labelText="Elija una fecha"
            v-model="date"
            :errors="errors"
            :options="dates"
            name="date"
          />
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <button
            class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 lg:mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Ver gráfico de consumo
          </button>
        </div>
      </div>
    </form>
    <div
      ref="line"
      class="bg-gray-100 dark:bg-gray-700 w-full h-96 m-4 rounded-lg border-2 shadow-lg border-gray-100 dark:border-gray-700"
    ></div>
  </div>
</template>
