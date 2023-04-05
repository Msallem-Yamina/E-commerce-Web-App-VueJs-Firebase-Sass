<template>
  <b-container fluid class="pt-5">
    <b-row class="px-xl-5 pb-3">
      <b-col md="6" sm="12">
        <div class="image mb-3">
          <img src="../assets/sass/images/blog_img_01.jpg" alt="img 1" />
          <div class="offer-text text-white">
            <h6 class="fw-bold">Save 20%</h6>
            <h3 class="mb-3 mt-2 fw-bold">Special Offer</h3>
            <b-button href="#" variant="warning" class="px-2"
              >Shop Now</b-button
            >
          </div>
        </div>
      </b-col>
      <b-col md="6" sm="12">
        <div class="image">
          <img
            src="../assets/sass/images/wristwatch-ga0c95cc90_1920.jpg"
            alt="img 2"
          />
          <div class="offer-text text-white">
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
import { collection, getFirestore, query, getDocs } from "firebase/firestore";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Offer",
  data() {
    return {
      Category: [],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const db = getFirestore(),
        q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);
      this.Category = [];
      querySnapshot.forEach((doc) => {
        this.Category.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/main.scss";
.title {
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    top: 50%;
    left: 0;
    border-top: 1px dashed #bec5cb;
    z-index: -1;
  }
}
.card {
  box-shadow: 5px 5px 10px #8080802e;
}
.card-title {
  font-weight: bold;
  margin: 0;
  text-transform: capitalize;
}
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
