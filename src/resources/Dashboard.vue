<template>
  <div class="container mt-3">
    <div class="row justify-content-md-center p-3">
      <div
        class="col-lg-5 mb-3 mb-lg-5 border border-2 rounded p-3 bg-light mx-4"
      >
        <apexchart type="bar" :options="chartOptions" :series="chartSeries" />
      </div>
      <div
        class="col-lg-5 mb-3 mb-lg-5 border border-2 rounded p-3 bg-light mx-4"
      >
        <apexchart type="bar" :options="chartOptions" :series="chartSeries" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    apexchart: () => import("vue-apexcharts"),
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          height: 50,
        },
        xaxis: {
          categories: ["Học kỳ 1", "Học kỳ 2", "Học kỳ 3"],
          title: {
            text: "Học Kỳ",
          },
        },
        yaxis: {
          title: {
            text: "Tổng số tín chỉ",
          },
        },
        title: {
          text: "Thống kê tín chỉ theo học kỳ",
          align: "left",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
      },
      chartSeries: [
        {
          name: "Tổng số tín chỉ",
          data: [4, 6, 3],
        },
      ],
    };
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
  background: #eee;
}
.card {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
}
.avatar.sm {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 0.818125rem;
}
.table-nowrap .table td,
.table-nowrap .table th {
  white-space: nowrap;
}
.table > :not(caption) > * > * {
  padding: 0.75rem 1.25rem;
  border-bottom-width: 1px;
}
table th {
  font-weight: 600;
  color: white;
  background-color: var(--vt-c-green) !important;
}
</style>
