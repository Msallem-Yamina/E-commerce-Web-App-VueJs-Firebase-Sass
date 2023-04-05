<template>
  <b-container fluid class="pt-4">
    <b-row class="px-xl-5">
      <b-col>
        <b-breadcrumb :items="crumbs" class="bg-white py-2 ps-3"></b-breadcrumb>
      </b-col>
    </b-row>
    <b-row class="px-xl-5">
      <b-col md="8">
        <div v-if="MyCart.length > 0">
          <b-table-simple hover small responsive>
            <b-thead class="text-light" style="background: #1f2e4d">
              <b-tr>
                <b-th class="py-3" colspan="3">Name</b-th>
                <b-th class="py-3" colspan="3">Price</b-th>
                <b-th class="py-3" colspan="3">Quantity</b-th>
                <b-th class="py-3" colspan="3">Total</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="prod in MyCart"
                :key="prod.id"
                class="bg-white"
                style="vertical-align: middle"
              >
                <b-td colspan="3">
                  <img :src="prod.image" alt="" width="80px" height="60px" />
                  {{ prod.name }}</b-td
                >
                <b-td colspan="3"> {{ prod.price }} DT</b-td>
                <b-td colspan="3">
                  <b-form-group>
                    <b-form-input
                      id="quantity"
                      v-model="prod.qte"
                      type="number"
                      min="1"
                      class="w-25 m-auto text-center shadow-none"
                    ></b-form-input>
                  </b-form-group>
                </b-td>
                <b-td colspan="3"> {{ prod.price * prod.qte }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
        <div v-else>
          <p>Your shopping basket is empty.</p>
        </div>
      </b-col>
      <b-col md="4">
        <h5 class="text-start text-uppercase mb-3">Cart Summary</h5>
        <div class="bg-white p-30 mb-5">
          <div class="p-2">
            <div class="d-flex justify-content-between mt-2">
              <h5>Total:</h5>
              <h5>{{ total }} DT</h5>
            </div>
            <button
              class="btn btn-block btn-warning font-weight-bold my-3 py-2"
              to="/login"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "cart",
  //   props: {
  //     cartItems: JSON.parse(route.params.cartItems),
  //   },
  data() {
    return {
      MyCart: JSON.parse(this.$route.params.cartItems),
      totalProd: 0,
      crumbs: [
        { text: "Home", to: { name: "home" } },
        { text: "Products", href: "/#Prod-sec" },
        { text: "Cart", active: true },
      ],
    };
  },
  created() {
    // console.log(this.MyCart);
  },
  methods: {
    removeProduct(index) {
      this.MyCart.splice(index, 1);
    },
  },
  computed: {
    total() {
      let total = 0;
      this.MyCart.forEach((product) => {
        total += product.price * product.qte;
      });
      return total.toFixed(3);
    },
  },
};
</script>

<style></style>
