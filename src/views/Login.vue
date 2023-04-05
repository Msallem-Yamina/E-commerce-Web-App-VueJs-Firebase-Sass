<template>
  <b-container class="bv-example-row my-4 mx-auto p-5 bg-white">
    <b-row class="justify-content-center">
      <b-col sm="12" md="8">
        <div
          class="d-flex justify-content-between align-items-center flex-column gap-2 gap-sm-0 flex-sm-row"
        >
          <h3 class="m-0 fw-bold">Sign In!</h3>
          <h6 class="m-0 fw-bold register">
            Not a member yet?
            <b-link
              to="/register"
              class="text-decoration-none fw-bold text-warning"
            >
              Sign Up Now!
            </b-link>
          </h6>
        </div>
        <b-form @submit.prevent="onSubmit" class="pt-3 pb-3">
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            placeholder="Username Or Email"
            class="mb-3 p-2 bg-white shadow-3"
            required
          ></b-form-input>

          <b-form-input
            id="input-2"
            v-model="user.password"
            type="password"
            placeholder="Password"
            class="mb-3 p-2 bg-white"
            required
          ></b-form-input>

          <b-button
            type="submit"
            class="fw-bold p-2 text-uppercase w-100 text-warning"
            >Login</b-button
          >
        </b-form>
        <b-row class="fogetpass mb-3">
          <b-link to="/forgetpassword" class="text-decoration-none fw-bold">
            Forgot your password?
          </b-link>
        </b-row>
        <b-row>
          <h6 class="m-0 fw-bold text-start p-0">Or sign in with</h6>
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(async (UserData) => {
          localStorage.setItem("User", UserData.user.uid);
          const db = getFirestore();
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", UserData.user.uid));
          getDocs(q)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const user = doc.data();
                if (user) {
                  if (user.isAdmin === "true") {
                    router.push({
                      name: "Dash",
                    });
                  } else {
                    router.push({
                      name: "HomeUser",
                    });
                  }
                }
              });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
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
      transition: 0.6s ease;
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
      border: 1px solid $color-global;
    }
  }
  .fogetpass {
    a {
      color: $color-global;
    }
  }
}
</style>
