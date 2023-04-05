<template>
  <b-container fluid class="d-lg-block d-none">
    <b-row class="px-xl-5">
      <b-col lg="3">
        <b-dropdown
          toggle-class="shadow-none btn-warning d-flex align-items-center justify-content-between rounded-0"
          split-variant="outline-primary"
          variant="none"
          class="w-100 h-100"
          menu-class="w-100 rounded-0"
        >
          <template #button-content>
            <b-icon icon="justify" aria-hidden="true"></b-icon>All Categories
          </template>

          <b-dropdown-item href="#" v-for="cat in Category" :key="cat.id">{{
            cat.name
          }}</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col lg="6">
        <b-list-group horizontal class="pt-2 w-50">
          <b-list-group-item
            to="/"
            class="bg-transparent text-white border-0"
            active
            >Home</b-list-group-item
          >
          <b-list-group-item
            href="#Prod-sec"
            class="bg-transparent text-white border-0"
            >Products</b-list-group-item
          >
          <b-list-group-item to="" class="bg-transparent text-white border-0"
            >Men</b-list-group-item
          >
          <b-list-group-item to="" class="bg-transparent text-white border-0"
            >Women</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col
        lg="3"
        class="d-flex justify-content-end align-items-center position-relative"
      >
        <b-button
          size="lg"
          variant="none"
          class="border-0"
          @click="showCart = !showCart"
        >
          <b-icon icon="cart-fill" variant="warning" class="icon-cart"></b-icon>
          <span
            class="rounded-circle ms-1 border text-light"
            style="padding: 2px 5px 2px 0"
          >
            {{ cartItems.length }}
          </span>
        </b-button>
        <b-card no-body class="overflow-hidden" v-if="showCart">
          <b-row
            no-gutters
            class="align-items-center"
            v-for="(item, idx) in cartItems"
            :key="item.id"
          >
            <b-col md="4">
              <b-card-img
                :src="item.image"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6" class="text-start">
              <b-card-body title-tag="h5" :title="item.name">
                <b-card-sub-title class="fw-bold"
                  >{{ item.price }} DT</b-card-sub-title
                >
                <b-card-text class="mt-2">
                  <b-form-group>
                    <label for="quantity">Quantité</label>
                    <b-form-input
                      id="quantity"
                      v-model="item.qte"
                      type="number"
                      min="1"
                    ></b-form-input>
                  </b-form-group>
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col md="2" class="d-flex align-items-center">
              <b-button variant="danger" @click="removeFromCart(idx)">
                <b-icon icon="x" scale="2"></b-icon>
              </b-button>
            </b-col>
          </b-row>
          <p class="fw-bold d-flex align-items-center justify-content-center">
            Total: <span class="p-2">{{ total.toFixed(3) }}DT</span>
          </p>
          <b-button
            :to="{
              name: 'cart',
              params: { cartItems: JSON.stringify(cartItems) },
            }"
            variant="dark"
            class="see mb-2"
            >See cart</b-button
          >
          <b-button to="" variant="success">Proceed to checkout</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import db from "@/firebase.js";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      showCart: false,
      cartItems: [],
      total: 0,
      cat: {
        name: "",
      },
      Category: [],
      DataCatID: {
        name: "",
        id: "",
      },
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    this.$root.$on("addToCart", (product) => {
      const res = this.cartItems.find((item) => item.id === product.id);
      if (res) {
        res.qte++;
      } else {
        this.cartItems.push(product);
      }
    });
  },
  methods: {
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    calculerTotal() {
      this.total = 0;
      this.cartItems.forEach((prod) => {
        this.total += prod.price * prod.qte;
      });
      return this.total;
    },
    AddCat() {
      const db = getFirestore();
      addDoc(
        collection(db, "categories"),
        {
          name: this.cat.name,
          //  uid : this.prod.uid,
        },
        location.reload()
      );
    },
    GetOneCategory(id, name) {
      this.DataCatID.name = name;
      this.DataCatID.id = id;
    },
    async EditCategory() {
      const washingtonRef = doc(db, "categories", this.DataCatID.id);
      await updateDoc(washingtonRef, {
        name: this.DataCatID.name,
      })
        .then(() => {
          console.log("updated");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async DeleteCat(id) {
      const db = getFirestore();
      await deleteDoc(doc(db, "categories", id))
        .then(() => {
          console.log("deleted");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
  watch: {
    cartItems: {
      handler() {
        this.calculerTotal();
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/main.scss";
.container-fluid {
  background: $color-global;
  z-index: 1001;
  position: sticky;
}
.see {
  background: $color-global;
}
.icon-cart {
  color: #ffbf00;
}
.card {
  position: absolute;
  top: 46px;
  right: 0;
  width: 350px;
  z-index: 1000;
  padding: 16px 20px;
}
</style>
