<template>
  <b-container class="py-5">
    <b-row>
      <b-button v-b-modal.modal-center class="add-prod py-2 w-50 mx-auto mb-3">
        Add New Product
      </b-button>
      <b-modal id="modal-center" centered title="Add New Product">
        <b-form @submit.prevent="AddProd" class="py-3">
          <b-form-input
            id="name"
            v-model="prod.name"
            type="text"
            placeholder="Name Product"
            class="mb-3 bg-white"
            required
          ></b-form-input>
          <b-form-textarea
            id="desc"
            v-model="prod.description"
            type="text"
            placeholder="Description"
            class="mb-3 bg-white"
            required
          ></b-form-textarea>
          <b-form-input
            id="price"
            v-model="prod.price"
            type="number"
            placeholder="price"
            class="mb-3 bg-white"
            required
          ></b-form-input>
          <div class="form-group">
            <select class="form-control" id="category" v-model="categoryId">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <b-form-file
            id="image"
            type="file"
            accept=".jpg, .png"
            class="mb-3 bg-white"
            required
            @change="previewImage"
          ></b-form-file>
          <b-alert
            variant="success"
            :value="messageSuccess"
            show
            v-if="messageSuccess === 'Added'"
            >Added</b-alert
          >
          <b-progress :value="uploadValue" show-progress></b-progress>
          <b-alert variant="success" v-if="uploadValue === 100" show
            >Success Upload</b-alert
          >
          <b-button type="submit" class="add-prod py-2">Add</b-button>
        </b-form>
      </b-modal>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col md="8">
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(Prod, index) in Products" :key="Prod.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ Prod.name }}</td>
              <td>
                <img :src="Prod.image" alt="img" height="60px" width="60px" />
              </td>
              <td>{{ Prod.price }}DT</td>
              <td>
                <b-button
                  v-b-modal.modal-edit
                  variant="success"
                  class="me-2 p-2"
                  @click="GetOneProd(Prod.id, Prod.name)"
                >
                  Edit
                </b-button>
                <button class="btn btn-danger p-2" @click="DeleteProd(Prod.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-modal id="modal-edit" centered title="Update Product">
      <b-form @submit.prevent="EditProd()" class="py-3">
        <b-form-input
          id="name"
          type="text"
          placeholder="Name Product"
          class="mb-3 bg-white"
          v-model="DataProdID.name"
          required
        ></b-form-input>
        <b-button type="submit" class="add-prod py-2">Update</b-button>
      </b-form>
    </b-modal>
  </b-container>
</template>
<script>
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  collectionGroup,
  doc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const db = getFirestore();
export default {
  name: "AllProd",
  data() {
    return {
      prod: {
        name: "",
        description: "",
        price: "",
        image: "",
      },
      Products: [],
      DataProdID: {
        name: "",
        id: "",
      },
      categories: [],
      categoryId: null,

      uploadValue: 0,
      img: null,
      imageData: null,
      messageSuccess: "",
    };
  },
  created() {
    this.getProducts();
    this.getCategory();
  },
  methods: {
    AddProd() {
      addDoc(collection(db, `categories/${this.categoryId}/products`), {
        name: this.prod.name,
        description: this.prod.description,
        price: this.prod.price,
        image: this.img,
      })
        .then(() => {
          this.messageSuccess = "Added";
          location.reload();
        })
        .catch((error) => {
          console.error("Error adding product: ", error);
        });
    },
    AddImg() {
      // Upload Image here
      this.img = null;
      const storage = getStorage();
      // Create a child reference
      const imagesRef = ref(storage, "images");
      // imagesRef now points to 'images'
      // Child references can also take paths delimited by '/'
      const storageRef = ref(imagesRef, `${this.imageData.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            this.img = url;
            // console.log(this.img);
          });
        }
      );
    },
    async getCategory() {
      const q = query(collection(db, "categories")),
        querySnapshot = await getDocs(q);
      this.categories = [];
      querySnapshot.forEach((doc) => {
        this.categories.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    },
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
      // console.log(this.Products);
    },
    async EditProd() {
      const querySnapshot = await getDocs(
          collectionGroup(db, "products"),
          where("id", "==", this.DataProdID.id)
        ),
        matchingDocs = querySnapshot.docs;
      if (matchingDocs.length > 0) {
        const matchingDocRef = doc(db, matchingDocs[0].ref.path);
        console.log(matchingDocRef);
        await updateDoc(matchingDocRef, {
          name: this.DataProdID.name,
        });
        console.log("Document updated successfully!");
        location.reload();
      } else {
        console.log("No matching documents found.");
      }
    },
    GetOneProd(id, name) {
      this.DataProdID.name = name;
      this.DataProdID.id = id;
    },
    async DeleteProd(id) {
      const querySnapshot = await getDocs(
          collectionGroup(db, "products"),
          where("id", "==", id)
        ),
        matchingDocs = querySnapshot.docs;
      if (matchingDocs.length > 0) {
        const matchingDocRef = doc(db, matchingDocs[0].ref.path);
        await deleteDoc(matchingDocRef);
        location.reload();
      } else {
        console.log("No matching documents found.");
      }
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img = null;
      this.imageData = event.target.files[0];
      this.AddImg();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.add-prod {
  background: $color-global;
  &:hover {
    background: $color-global;
  }
}
</style>
