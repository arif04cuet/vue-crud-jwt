<template>
  <div id="app">
    <app-header />
    <FlashMessage></FlashMessage>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header/header.vue";
export default {
  name: "app",
  components: {
    "app-header": Header,
  },
  created() {
    this.$store.dispatch("AutoLogin");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Thambi+2&display=swap");
body,
html {
  margin: 0;
  font-family: "Baloo Thambi 2", cursive;
}
input.error {
  border: 1px solid red !important;
}
</style>