<template>
  <b-container fluid class="pt-5 overflow-hidden">
    <b-row class="icons px-xl-5 pb-3">
      <b-col sm="12" md="6" lg="3">
        <div
          class="d-flex justify-content-center align-items-center bg-white p-4 mb-4"
        >
          <b-icon
            icon="check-lg"
            aria-hidden="true"
            class="text-warning fw-bold"
            font-scale="2"
          ></b-icon>
          <h5 class="fw-bold fs-5 ms-2">Quality Product</h5>
        </div>
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <div
          class="d-flex justify-content-center p-4 align-items-center bg-white mb-4"
        >
          <b-icon
            icon="truck"
            aria-hidden="true"
            class="text-warning fw-bold"
            font-scale="2"
          ></b-icon>
          <h5 class="fw-bold fs-5 ms-2">Free Shipping</h5>
        </div>
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <div
          class="d-flex justify-content-center p-4 align-items-center bg-white mb-4"
        >
          <b-icon
            icon="arrow-left-right"
            aria-hidden="true"
            class="text-warning fw-bold"
            font-scale="2"
          ></b-icon>
          <h5 class="fw-bold fs-5 ms-2">14-Day Return</h5>
        </div>
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <div
          class="d-flex justify-content-center p-4 align-items-center bg-white"
        >
          <b-icon
            icon="telephone-fill"
            aria-hidden="true"
            class="text-warning fw-bold"
            font-scale="2"
          ></b-icon>
          <h5 class="fw-bold fs-5 ms-2">24/7 Support</h5>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Features",
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.icons {
  animation: 4s linear 0s infinite alternate move;
}
@keyframes move {
  from {
    transform: translateX(-5%);
  }
  to {
    transform: translateX(5%);
  }
}
</style>
