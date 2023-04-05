<template>
  <b-container>
    <sidebar v-if="connect" />
    <router-view />
  </b-container>
</template>

<script>
import sidebar from "@/components/global/sidebar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dash",
  data: () => {
    return {
      connect: false,
    };
  },
  components: {
    sidebar,
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        this.connect = true;
      } else {
        this.connect = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>
