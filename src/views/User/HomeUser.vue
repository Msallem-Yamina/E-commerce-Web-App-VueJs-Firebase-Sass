<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>Hello {{ username }}</h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

export default {
  name: "HomeUser",
  data() {
    return {
      username: "",
    };
  },
  async created() {
    const auth = getAuth(),
      user = auth.currentUser,
      db = getFirestore(),
      usersRef = collection(db, "users"),
      q = query(usersRef, where("uid", "==", user.uid));
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData) {
            this.username = userData.username;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style></style>
