<template>
  <b-container fluid class="position-relative">
    <b-row class="py-1 px-xl-5">
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
          class="me-2"
          right
          toggle-class="shadow-none rounded-0"
        >
          <b-dropdown-item to="/login" v-if="user == null"
            >Sign In</b-dropdown-item
          >
          <b-dropdown-item to="/register" v-if="user == null"
            >Sign Up</b-dropdown-item
          >
          <b-button class="w-100 mx-1" v-if="user" @click="logout()"
            >Sign Out</b-button
          >
        </b-dropdown>
        <b-dropdown
          id="dropdown-1"
          text="EN"
          class="text-secondary bg-light"
          right
          toggle-class="shadow-none rounded-0"
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
  </b-container>
</template>
<script>
/* eslint-disable */
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import router from "../../router";
export default {
    name: "TopBar",
    data (){
    return {
      user: null,
    }
  },
  created(){
      const auth = getAuth();
      onAuthStateChanged(auth, (userAuth) => {
         if (userAuth) {
          this.user = userAuth;
          //  console.log(this.user)
         } else {
          // User is signed out
          this.user = null
          //  console.log(this.user)
        }
      });
    },
  methods: {
    logout(){
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          // console.log("Sign-out successful")
          localStorage.removeItem("User");
          router.push({
            name: 'login'
          })
        }).catch((error) => {
          // An error happened.
          console.log(error)
      });
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";
</style>