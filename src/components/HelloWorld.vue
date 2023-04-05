<template>
  <b-container fluid class="mb-3 mt-4">
    <b-row class="px-xl-5">
      <b-col lg="8">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block"
                width="1024"
                height="500"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                src="../assets/sass/images/carousel-1.jpg"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block"
                width="1024"
                height="500"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                src="../assets/sass/images/carousel-2.jpg"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block"
                width="1024"
                height="500"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                src="../assets/sass/images/carousel-3.jpg"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col lg="4" class="text-white">
        <div class="image mb-3 mt-3 mt-lg-0">
          <img src="../assets/sass/images/blog_img_01.jpg" alt="img 1" />
          <div class="offer-text">
            <h6 class="fw-bold">Save 20%</h6>
            <h3 class="mb-3 mt-2 fw-bold">Special Offer</h3>
            <b-button href="#" variant="warning" class="px-2"
              >Shop Now</b-button
            >
          </div>
        </div>
        <div class="image">
          <img
            src="../assets/sass/images/wristwatch-ga0c95cc90_1920.jpg"
            alt="img 2"
          />
          <div class="offer-text">
            <h6 class="fw-bold">Save 20%</h6>
            <h3 class="mb-3 mt-2 fw-bold">Special Offer</h3>
            <b-button href="#" variant="warning" class="px-2"
              >Shop Now</b-button
            >
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import db from "@/firebase.js";
import { query, getDocs, collectionGroup } from "firebase/firestore";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      Products: [],
    };
  },
  components: {},
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const sousCollectionRef = query(collectionGroup(db, `products`)),
        sousCollectionSnapshot = await getDocs(sousCollectionRef);
      this.Products = [];
      sousCollectionSnapshot.forEach((doc) => {
        this.Products.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image,
        });
      });
      //  console.log(this.Products[0].id)
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/main.scss";
.image {
  position: relative;
  height: 242px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    transition: 0.7s ease;
  }
  .offer-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    .b-button {
      color: #1f2e4d;
    }
  }
  &::before {
    content: "";
    background: rgb(18 18 18 / 39%);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  &:hover img {
    transform: rotate(3deg) scale(1.3);
  }
}
</style>
