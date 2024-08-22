<template>
  <div class="pagination-container">
    <b-pagination
      v-model="currentPage"
      :total-rows="total"
      :per-page="perPage"
      @change="onPageChange"
      aria-controls="pagination"
      align="center"
    ></b-pagination>
  </div>
</template>
  
  <script>
import { BPagination } from "bootstrap-vue";

export default {
  components: {
    BPagination,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onPageChange(page) {
      this.$emit("update:currentPage", page);
    },
  },
};
</script>
  
<style scoped>
.pagination-container {
  margin-top: 1rem;
}
</style>