<template>
  <div class="add container">
    <h3>Add Product</h3>
    <hr />

    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-row">
        <div class="form-group col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="Title"
            v-model="product.title"
            required
          />
          <Error error-for="title" />
        </div>
        <div class="form-group col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="Price"
            v-model="product.price"
            required
          />
          <Error error-for="price" />
        </div>

        <div class="form-group col-md-4">
          <input
            type="file"
            class="form-control-file"
            placeholder="Image"
            @change="onImageChange"
            accept="image/*"
          />
          <Error error-for="file" />
          <br />
          <img
            v-if="currentId && product.image"
            :src="product.image"
            :alt="product.title"
            width="100"
          />
        </div>
      </div>
      <div class="form-group">
        <textarea
          v-model="product.description"
          cols="30"
          rows="3"
          class="form-control"
          placeholder="Description"
        ></textarea>
        <Error error-for="description" />
      </div>

      <button type="submit" class="btn btn-primary">
        <span v-if="currentId">Update</span>
        <span v-else>Create</span>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Error from "../header/error.vue";
import ProductService from "../../services/products";
export default {
  components: { Error },
  name: "ProductAdd",
  data() {
    return {
      product: {
        id: null,
        title: "",
        price: "",
        description: "",
        image: null,
      },
      submitted: false,
      currentId: false,
      uploadedImage: false,
    };
  },

  methods: {
    ...mapActions(["hasError"]),
    onSubmit(event) {
      event.preventDefault();

      let item = new FormData();

      item.append("title", this.product.title);
      item.append("price", this.product.price);
      item.append("description", this.product.description);

      if (this.uploadedImage) {
        item.append("image", this.uploadedImage);
      }

      if (this.currentId) {
        this.updateProduct(this.currentId, item);
      } else {
        this.createProduct(item);
      }
    },

    createProduct(item) {
      ProductService.create(item)
        .then((response) => {
          this.$store.dispatch("setError", {});
          this.$router.push({ name: "product-list" });
          return response;
        })
        .catch((error) => {
          this.$store.dispatch("setError", error.response.data.data);
          console.log(error.response.data);
          return error;
        });
    },
    updateProduct(id, item) {
      ProductService.update(id, item)
        .then((response) => {
          this.$store.dispatch("setError", {});
          this.$router.push({ name: "product-list" });
          return response;
        })
        .catch((error) => {
          this.$store.dispatch("setError", error.response.data.data);
          console.log(error.response.data);
          return error;
        });
    },

    getProduct(id) {
      ProductService.get(id)
        .then((response) => {
          console.log(response.data);
          this.product = response.data.data;
          return response;
        })
        .catch((error) => {
          this.$store.dispatch("setError", error.response.data.data);
          console.log(error.response.data);
          return error;
        });
      this.product = {};
    },

    onImageChange(e) {
      this.uploadedImage = e.target.files[0];
    },
  },

  mounted() {
    const id = this.$route.params.id;
    if (typeof id !== "undefined") {
      this.currentId = id;
      this.getProduct(this.currentId);
    }
  },
};
</script>