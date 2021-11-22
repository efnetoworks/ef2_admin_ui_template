<template>
  <!-- spinner -->
  <div class="spinner-border text-info spinner-setting" role="status" v-if="loading">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.spinner-setting {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  font-size: 10px;
  z-index: 999999;
}
.spinner-border {
  border: 0.60em dashed var(--primary-color);
  border-right-color: transparent !important;
  width: 3rem;
  height: 3rem;
}
</style>
