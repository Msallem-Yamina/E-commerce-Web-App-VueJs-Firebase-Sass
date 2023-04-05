<template>
  <div id="app">
    <navbar />
    <Header />
    <router-view />
    <end />
  </div>
</template>
<script>
/* eslint-disable */
import navbar from "@/components/global/navbar.vue";
import end from "@/components/global/Footer.vue";
// import TopBar from "@/components/global/TopBar.vue";
import Header from "@/components/global/Header.vue"

export default {
  name: "App",
  components: {
    navbar,
    end,
    // TopBar,
    Header,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  main {
    background-color: blueviolet;
  }
}
</style>
