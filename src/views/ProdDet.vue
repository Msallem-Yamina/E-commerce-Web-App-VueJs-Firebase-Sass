<template>
  <b-container fluid>
    <b-row class="px-xl-5 pb-3">
      <b-col lg="12">
        <h4
          class="bg-white w-100 my-3 px-3 py-2 text-start text-secondary fs-5"
        >
          Shop Detail
        </h4>
      </b-col>
    </b-row>
    <b-row class="px-xl-5 pb-3">
      <b-col lg="5">
        <div class="image-zoom">
          <img
            :src="$route.params.image"
            alt="image"
            :class="{ zoomed: isZoomed }"
            width="100%"
            @mouseover="isZoomed = true"
            @mouseout="isZoomed = false"
          />
        </div>
      </b-col>
      <b-col lg="7">
        <b-card
          class="position-relative h-100 mt-lg-0 mt-3 border-light rounded-0 text-start"
        >
          <b-card-body>
            <b-card-title class="text-capitalize fw-bold fs-2">{{
              $route.params.name
            }}</b-card-title>
            <div class="mb-4 d-flex justify-content-start align-items-center">
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-half"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
            </div>
            <b-card-title class="mb-2 fw-bold text-secondary"
              >${{ $route.params.price }}</b-card-title
            >
            <b-card-text class="my-2">
              {{ $route.params.desc }}
            </b-card-text>
            <b-card-text>
              <div class="d-flex mb-2">
                <strong class="me-4">Sizes:</strong>
                <b-form-radio-group
                  v-model="selectedSize"
                  :options="optSize"
                  class="text-secondary"
                  name="radio-inline"
                  plain
                ></b-form-radio-group>
              </div>
              <div class="d-flex mb-2">
                <strong class="me-4">Colors:</strong>
                <b-form-radio-group
                  v-model="selectedColor"
                  :options="optColor"
                  name="radio-inline"
                  class="text-capitalize text-secondary"
                  plain
                ></b-form-radio-group>
              </div>
              <div class="d-flex align-items-center mt-2">
                <b-input-group class="me-3">
                  <b-input-group-prepend>
                    <b-button
                      variant="warning"
                      class="rounded-0"
                      @click="decrement"
                    >
                      <span class="fw-bold fs-3">-</span>
                    </b-button>
                  </b-input-group-prepend>
                  <b-form-input
                    min="0"
                    max="100"
                    v-model="qte"
                    class="text-center"
                    disabled
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      variant="warning"
                      class="h-100 rounded-0"
                      @click="increment"
                    >
                      <span class="fw-bold fs-4">+</span>
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
                <b-button variant="warning" class="rounded-0 cart"
                  ><b-icon icon="cart-fill" variant="none" class="me-2"></b-icon
                  >Add To Cart</b-button
                >
              </div>
              <div class="d-flex pt-2 mt-3">
                <strong class="text-dark mr-2">Share on:</strong>
                <div class="d-inline-flex">
                  <a class="text-dark px-2" href="">
                    <b-icon icon="facebook" aria-hidden="true"></b-icon>
                  </a>
                  <a class="text-dark px-2" href="">
                    <b-icon icon="twitter" aria-hidden="true"></b-icon>
                  </a>
                  <a class="text-dark px-2" href="">
                    <b-icon icon="linkedin" aria-hidden="true"></b-icon>
                  </a>
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ProdDet",
  data() {
    return {
      Products: [],
      selectedSize: "A",
      optSize: [
        { text: "XS", value: "A" },
        { text: "S", value: "B" },
        { text: "M", value: "C" },
        { text: "L", value: "D" },
        { text: "XL", value: "E" },
      ],
      selectedColor: "0",
      qte: 1,
      optColor: [
        { text: "white", value: "0" },
        { text: "black", value: "1" },
        { text: "red", value: "2" },
        { text: "blue", value: "3" },
        { text: "green", value: "4" },
      ],
      isZoomed: false,
    };
  },
  created() {},
  methods: {
    decrement() {
      this.qte > 1 ? this.qte-- : 0;
    },
    increment() {
      this.qte++;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  width: 170px;
  .b-icon {
    color: #1f2e4d;
  }
}
.cart {
  padding: 12px;
  color: #1f2e4d;
  > .b-icon {
    color: #1f2e4d;
  }
}
</style>
