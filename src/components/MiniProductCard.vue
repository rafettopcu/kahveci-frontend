<template>
  <div>
    <a-modal title="Ürün ekle" v-model="showAddProductModal" :footer="null">
      <AddProductModal v-model="showAddProductModal" />
    </a-modal>
    <AddCartModal v-model="addCartModalShow" :product="product" />
    <div v-if="product" class="product-card" @click="clickProduct">
      <img :src="product.photo" alt="" class="product-card-image" />
      <div class="product-card-bg">
        <div class="product-card-name ">{{ product.name }}</div>
      </div>
    </div>

    <div
      v-else-if="!product && role === 1"
      class="product-card"
      @click="showAddProductModal = true"
    >
      <img style="background:white" alt="" class="product-card-image" />
      <div class="product-card-bg">
        <div style="text-align:center;padding:20px 20px 0 20px;font-size:32px">
          +<br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AddCartModal from "../components/AddCartModal";
import AddProductModal from "../components/AddProductModal";
export default {
  components: { AddCartModal, AddProductModal },
  props: ["product"],
  data() {
    return {
      showAddProductModal: false,
      addCartModalShow: false
    };
  },
  computed: {
    ...mapGetters(["role"])
  },
  methods: {
    clickProduct() {
      this.addCartModalShow = true;
    }
  }
};
</script>

<style>
.product-card-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
.product-card {
  margin: 8px;
}
.product-card-name {
  position: absolute;
  bottom: 2px;
  left: 6px;
  color: darkgrey;
}

.product-card-bg {
  background: rgba(255, 255, 255, 0)
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 0.5) 75%,
      rgb(0, 0, 0, 0.8) 100%
    )
    repeat scroll 0 0;
  position: relative;
  margin-top: -100px;
  height: 100px;
  font-family: "Rubik", sans-serif;
}
</style>
