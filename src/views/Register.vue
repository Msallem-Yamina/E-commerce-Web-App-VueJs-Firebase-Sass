<template>
  <b-container class="bv-example-row my-4 mx-auto p-5 bg-white">
    <b-row class="justify-content-center">
      <b-col sm="12" md="8">
        <div
          class="d-flex justify-content-between align-items-center flex-column gap-2 gap-sm-0 flex-sm-row"
        >
          <h3 class="m-0 fw-bold">Sign Up!</h3>
          <h6 class="m-0 fw-bold login">
            Are you a member?
            <b-link
              to="/login"
              class="text-decoration-none fw-bold text-warning"
            >
              Sign In Now
            </b-link>
          </h6>
        </div>
        <b-form @submit.prevent="onSubmit" class="py-3">
          <b-form-input
            id="username"
            v-model="user.username"
            type="text"
            placeholder="Username"
            class="mb-3 p-2 bg-white"
            required
          ></b-form-input>
          <b-form-input
            id="address"
            v-model="user.address"
            type="text"
            placeholder="Address"
            class="mb-3 p-2 bg-white"
            required
          ></b-form-input>
          <b-form-input
            id="tel"
            v-model="user.tel"
            type="number"
            placeholder="Phone Number"
            class="mb-3 p-2 bg-white"
            required
          ></b-form-input>
          <b-form-input
            id="email"
            v-model="user.email"
            type="email"
            placeholder="Email"
            class="mb-3 p-2 bg-white"
            required
          ></b-form-input>
          <b-form-input
            id="input-5"
            v-model="user.password"
            type="password"
            placeholder="Password"
            class="mb-3 p-2 bg-white"
            required
          ></b-form-input>

          <b-button
            type="submit"
            class="fw-bold p-2 text-uppercase w-100 text-warning"
            >Sign Up</b-button
          >
        </b-form>
        <b-row>
          <h6 class="m-0 fw-bold text-center p-0 orsign position-relative">
            Or Sign Up with
          </h6>
          <br />
          <b-list-group horizontal="lg" class="mt-2">
            <b-col class="me-lg-3 me-sm-0 mb-sm-2 me-0 mb-2">
              <b-list-group-item
                tag="li"
                class="p-0 w-100 h-100 bg-white rounded-0"
              >
                <b-link
                  href="https://www.gmail.com"
                  target="_blank"
                  class="text-decoration-none d-block w-100 h-100 p-2"
                >
                  <font-awesome-icon
                    icon="fab fa-google"
                    class="fs-4 text-success"
                  />
                </b-link>
              </b-list-group-item>
            </b-col>
            <b-col class="me-lg-3 me-sm-0 mb-sm-2 me-0 mb-2">
              <b-list-group-item tag="li" class="p-0 bg-primary rounded-0">
                <b-link
                  href="https://www.facebook.com"
                  class="text-decoration-none w-100 h-100 d-block p-2"
                >
                  <font-awesome-icon
                    icon="fab fa-facebook"
                    class="fs-4 text-white"
                  />
                </b-link>
              </b-list-group-item>
            </b-col>
            <b-col>
              <b-list-group-item tag="li" class="p-0 bg-info rounded-0">
                <b-link
                  href="https://www.linkedin.com"
                  class="text-decoration-none w-100 h-100 d-block p-2"
                  ><font-awesome-icon
                    icon="fab fa-linkedin"
                    class="fs-4 text-white rounded-circle"
                  />
                </b-link>
              </b-list-group-item>
            </b-col>
          </b-list-group>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import router from "../router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        address: "",
        tel: "",
        email: "",
        password: "",
        uid: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const db = getFirestore(),
        auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.user.email,
        this.user.password
      ).then((UserData) => {
        const userRef = doc(db, "users", UserData.user.uid);
        setDoc(userRef, {
          username: this.user.username,
          address: this.user.address,
          tel: this.user.tel,
          email: this.user.email,
          password: this.user.password,
          uid: UserData.user.uid,
          isAdmin: false,
        })
          .then(() => {
            localStorage.setItem("User", UserData.user.uid);
            router.push({ name: "HomeUser" }).catch((error) => {
              console.log("error manajemch");
              console.log(error);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/main.scss";
.container {
  form {
    input {
      outline: none;
      border: 1px solid #ced4da;
      transition: 0.3s ease;
      &::placeholder {
        color: #ced4da;
        font-weight: 600;
      }
      &:focus {
        box-shadow: 1px -1px 6px #ced4da;
      }
    }
    button {
      background: $color-global;
      border: 1px solid$color-global;
    }
  }
  .fogetpass,
  .login {
    a {
      color: $color-global;
    }
  }
}
</style>
