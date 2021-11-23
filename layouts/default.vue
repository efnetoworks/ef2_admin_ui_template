<template>
  <div class="app align-content-stretch d-flex flex-wrap">
    <Sidebar />
    <div class="app-container">
      <Search />

      <Header />

      <Nuxt />
    <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'default',
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped></style>
