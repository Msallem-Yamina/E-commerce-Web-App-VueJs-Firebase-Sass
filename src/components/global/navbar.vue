<template>
  <b-container fluid lg="px-0" class="bg-white">
    <b-row class="top-bar py-1 px-xl-5 position-relative">
      <b-col class="lg-6 d-none d-lg-block text-start">
        <div class="d-inline-flex align-items-center h-100">
          <a class="text-decoration-none me-3" href="">About</a>
          <a class="text-decoration-none me-3" href="">Contact</a>
          <a class="text-decoration-none me-3" href="">Help</a>
          <a class="text-decoration-none me-3" href="">FAQs</a>
        </div>
      </b-col>
      <b-col class="lg-6 text-center text-lg-end">
        <b-dropdown
          id="dropdown-1"
          text="My Account"
          class="me-2 text-dark"
          variant="none"
          right
          toggle-class="shadow-none rounded-0 py-1 px-2 border-light"
        >
          <b-dropdown-item to="/login" v-if="user == null"
            >Sign In</b-dropdown-item
          >
          <b-dropdown-item to="/register" v-if="user == null"
            >Sign Up</b-dropdown-item
          >
          <b-dropdown-item class="w-100 mx-1" v-if="user" @click="logout()"
            >Sign Out</b-dropdown-item
          >
        </b-dropdown>
        <b-dropdown
          id="dropdown-1"
          text="EN"
          variant="none"
          class="text-darkt"
          right
          toggle-class="shadow-none rounded-0 py-1 px-2 border-light"
        >
          <b-dropdown-item>FR</b-dropdown-item>
          <b-dropdown-item>AR</b-dropdown-item>
        </b-dropdown>
        <div class="d-lg-none d-inline">
          <b-button size="lg" variant="none" class="border-0 pe-0">
            <b-icon
              icon="cart-fill"
              variant="secondary"
              class="icon-cart"
            ></b-icon>
          </b-button>
          <span class="text-secondary fw-bold"> 0,000 DT</span>
        </div>
      </b-col>
    </b-row>
    <b-row class="navsm py-2 px-xl-5 px-3">
      <b-navbar toggleable="lg">
        <b-col lg="3" sm="6" class="text-start ms-lg-2">
          <b-navbar-brand tag="h2" class="p-0 fw-bold">
            <b-link
              to="/"
              class="text-decoration-none fw-bold text-uppercase py-2"
            >
              <span class="text-warning">E-</span>shop
            </b-link>
          </b-navbar-brand>
        </b-col>
        <b-navbar-toggle
          target="nav-collapse"
          class="bg-white shadow-none text-end"
        ></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav class="justify-content-between">
          <b-col lg="6">
            <b-input-group class="mt-2 mt-lg-0 ms-lg-5">
              <template #append>
                <b-button class="bg-transparent rounded-0 border"
                  ><b-icon
                    icon="search"
                    @click="filterItems()"
                    class="text-warning fw-bold"
                  ></b-icon>
                </b-button>
              </template>
              <b-form-input
                placeholder="Search for Products"
                class="rounded-0 shadow-none"
                v-model="searchProduct"
              ></b-form-input>
              <template #prepend>
                <b-dropdown
                  toggle-class="d-lg-none d-md-block btn-warning d-flex align-items-center justify-content-between rounded-0"
                  variant="none"
                  menu-class="w-100 rounded-0"
                >
                  <template #button-content> All Categories </template>

                  <b-dropdown-item href="#">Action</b-dropdown-item>
                  <b-dropdown-item href="#">Another action</b-dropdown-item>
                  <b-dropdown-item href="#"
                    >Something else here...</b-dropdown-item
                  >
                </b-dropdown>
              </template>
            </b-input-group>
          </b-col>
          <b-col lg="6">
            <div
              class="d-none d-lg-flex flex-column text-secondary text-end me-lg-2"
            >
              <p>Customer Service</p>
              <h5 class="text-black">+012 356 6894</h5>
            </div>
          </b-col>
        </b-collapse>
      </b-navbar></b-row
    >
  </b-container>
</template>
<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import router from "../../router";
import {
  getFirestore,
  query,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
const db = getFirestore();
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "navbar",
  data() {
    return {
      user: null,
      searchProduct: "",
      filteredProducts: [],
      Products: [],
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        this.user = userAuth;
      } else {
        this.user = null;
      }
    });
    this.getProducts();
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("User");
          router.push({
            name: "login",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getProducts() {
      const sousCollectionRef = query(collectionGroup(db, `products`));
      const sousCollectionSnapshot = await getDocs(sousCollectionRef);
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
    },
    filterItems() {
      this.filteredProducts = this.Products.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(this.searchProduct.toLowerCase());
      });
      this.$root.$emit("filtered-Products", this.filteredProducts);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/main.scss";
.container-fluid {
  z-index: 1001;
  position: sticky;
  .navsm {
    @media (max-width: 991px) {
      background: $color-global;
    }
    h2 {
      a {
        font-size: 30px;
        letter-spacing: 3px;
        color: $color-global;
        @media (max-width: 991px) {
          color: #ffc107;
        }
      }
    }
  }
  .top-bar {
    background: #f5f5f5;
    a {
      color: #6c757d;
    }
  }
  .b-dropdown {
    background: white;
  }
  .cart {
    color: white;
    font-size: 1.7rem;
  }
  .dropdown-toggle::after {
    display: none;
  }
  .user {
    .usericon {
      font-size: 2rem;
    }
    &::after {
      display: none;
    }
  }
}
</style>
