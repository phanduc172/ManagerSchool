<template>
  <div class="container p-3">
    <h2 class="text-center text-success shadow-sm p-2 header-bordered">
      Đọc dữ liệu từ tệp Excel
    </h2>

    <div class="d-flex justify-content-between align-items-center my-4">
      <div>
        <input type="file" @change="onFileSelect" accept=".xlsx, .xls" />
        <b-button
          @click="onFileUpload"
          :disabled="!selectedFile"
          variant="primary"
          class="mx-2"
        >
          Đọc file
        </b-button>
      </div>
      <b-button
        @click="onFileUpload"
        :disabled="!selectedFile"
        variant="success"
      >
        Tải lên
      </b-button>
    </div>

    <div v-if="loading" class="text-center text-info my-4">
      Đang đọc file...
    </div>

    <div v-if="rows.length && !loading">
      <table class="table table-bordered table-hover shadow-sm table-striped">
        <thead class="bg-success text-white text-uppercase">
          <tr class="text-center">
            <th>STT</th>
            <th
              v-for="(header, index) in rows[0]"
              :key="index"
              class="minwidth"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows.slice(1)"
            :key="rowIndex"
            class="text-center"
          >
            <td>{{ rowIndex + 1 }}</td>
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="minwidth"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import readXlsxFile from "read-excel-file";

export default {
  data() {
    return {
      selectedFile: null,
      rows: [],
      loading: false,
    };
  },
  methods: {
    onFileSelect(event) {
      this.selectedFile = event.target.files[0];
    },

    onFileUpload() {
      if (this.selectedFile) {
        this.loading = true;
        readXlsxFile(this.selectedFile)
          .then((rows) => {
            this.rows = rows;
            this.loading = false;
            console.log("Excel Data:", rows);
          })
          .catch((error) => {
            this.loading = false;
            console.error("Error reading file:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.header-bordered {
  border-bottom: 4px solid #44b97c;
}

.table-bordered th,
.table-bordered td {
  border-color: #44b97c !important;
}

.table th {
  background-color: #44b97c !important;
  color: white;
  font-weight: bold;
}

.table td {
  line-height: 2;
  white-space: nowrap;
}

.minwidth {
  min-width: 150px;
}
</style>
