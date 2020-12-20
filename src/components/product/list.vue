<template>
  <div class="list container">
    <br />
    <div class="text-right">
      <router-link to="/product/add" class="btn btn-primary"
        >Add Product</router-link
      >
    </div>
    <br />
    <div>
      <table class="table">
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>

        <tr v-for="product in products" class="todo" v-bind:key="product.key">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.title"
              width="100"
              height="100"
            />
          </td>
          <td>
            <router-link
              class="btn btn-primary"
              :to="{ name: 'product-edit', params: { id: product.id } }"
              >Edit</router-link
            >

            <button class="btn btn-danger" @click="deleteProduct(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ProductService from "../../services/products";
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    fetchProducts() {
      ProductService.getAll()
        .then((response) => {
          this.products = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteProduct(id) {
      console.log(id);
      ProductService.delete(id)
        .then((response) => {
          this.products = this.products.filter((product) => product.id != id);
          return response;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>