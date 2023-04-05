<template>
  <b-container fluid class="pt-5">
    <h3
      class="mx-xl-5 mb-4 title text-start fw-bold text-uppercase fs-3 position-relative pe-3"
    >
      <span class="pe-2">Categories</span>
    </h3>
    <b-row class="px-xl-5 pb-3">
      <b-col lg="3" md="4" sm="6" v-for="cat in Category" :key="cat.id">
        <b-card
          no-body
          class="overflow-hidden rounded-0 mb-3"
          style="max-width: 540px"
        >
          <b-row no-gutters>
            <b-col md="4">
              <b-card-img
                src="https://picsum.photos/400/400/?image=20"
                alt="Image"
                class="rounded-0 h-100"
              ></b-card-img>
            </b-col>
            <b-col md="8">
              <b-card-body
                title-tag="h6"
                :title="cat.name"
                title-variant="card-title"
                class="text-start"
                sub-title-tag="small"
                sub-title="100 product"
              >
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { collection, getFirestore, query, getDocs } from "firebase/firestore";
export default {
  name: "CategSec",
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
  span {
    background: #f5f5f5;
  }
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
</style>
