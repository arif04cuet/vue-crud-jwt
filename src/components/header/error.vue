<template>
  <div v-if="this.$store.state.errors.hasOwnProperty(errorFor)">
    <ul class="list-none">
      <li
        class="error"
        v-for="error in this.$store.state.errors[errorFor]"
        :key="error"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["errorFor"],
};
</script>
<style scoped>
.error {
  color: red;
  text-align: left;
}
.list-none {
  list-style-type: none;
  padding: 0;
  margin: 2px 0;
}
</style>