<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Features />
    <CategSec />
    <ProdSec />
    <OfferSec />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Features from "@/components/Features.vue";
import CategSec from "@/components/CategSec.vue";
import ProdSec from "@/components/Products.vue";
import OfferSec from "@/components/Offer.vue";
// import Sidebar from "@/components/global/sidebar.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Features,
    CategSec,
    ProdSec,
    OfferSec,
    // Sidebar,
  },
};
</script>
