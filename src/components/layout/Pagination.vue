<template>
  <b-pagination
    v-if="total > 0"
    v-model="currentPage"
    :total-rows="total"
    :per-page="limit"
    aria-controls="pagination-element"
    @change="onPageChange"
    class="justify-content-center "
  />
</template>

<script>
export default {
  name: "Paginations",
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
  },
  methods: {
    onPageChange(page) {
      this.$emit("page-changed", page);
    },
  },
};
</script>

<style scoped>

</style>
