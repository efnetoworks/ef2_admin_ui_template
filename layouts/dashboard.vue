<template>
  <div>
    <!-- <Header /> -->
    <!-- MAIN START -->
    <Nuxt />
    <!-- MAIN END -->
    <!-- <Footer /> -->
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {};
  },
  methods: {},
  head() {
    return {
      link: [
        // all css that belongs to only this page
        { rel: "stylesheet", href: "/assets/css/dashboard.css" },
        { rel: "stylesheet", href: "/assets/css/responsive.css" },
        { rel: "stylesheet", href: "/assets/css/dashboard-responsive.css" },
        { rel: "stylesheet", href: "/assets/css/dashstyles.css" },
      ],
      script: [
        // all js that belongs to only this page.
        // {
        //   src: "/assets/js/efcdashscripts.js",
        //   type: "text/javascript",
        //   body: true,
        // },
      ],
    };
  },
};
</script>

<style scoped></style>
