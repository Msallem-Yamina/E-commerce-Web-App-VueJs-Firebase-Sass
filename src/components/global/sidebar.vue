<template>
  <aside class="position-absolute text-white">
    <b-list-group class="text-start">
      <b-list-group-item
        to="/sidebar/category"
        class="bg-transparent text-white border-0 py-2 px-3"
        active
        >Category</b-list-group-item
      >
      <b-list-group-item
        to="/sidebar/Products"
        class="bg-transparent text-white border-0 py-2 px-3"
        >Products</b-list-group-item
      >
      <b-list-group-item
        to=""
        class="bg-transparent text-white border-0 py-2 px-3"
        >Order</b-list-group-item
      >
      <b-list-group-item
        to="/sidebar/profile"
        class="bg-transparent text-white border-0 py-2 px-3"
        >Profile</b-list-group-item
      >
    </b-list-group>
  </aside>
</template>
<script>
// import profile from "@/views/profile.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "sidebar",
  components: {
    // profile,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";
aside {
  top: 0;
  left: 0;
  width: 15%;
  z-index: 1000;
  background: $color-global;
  padding-top: 175px;
  min-height: 100vh;
}
</style>
