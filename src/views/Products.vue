<template>
  <div>
    <AddCartModal v-model="addCartModalShow" :product="clickedProduct" />
    <a-row type="flex">
      <a-col v-for="(product, index) in products" :key="index" :span="12">
        <div class="single-product" @click="clickProduct(product)">
          <img :src="product.photo" alt="" />
          <div class="product-title"></div>
          <div class="bg">
            <span class="title">{{ product.name }}</span>
            <span class="price">{{ product.price }} ₺</span>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import AddCartModal from "../components/AddCartModal";
export default {
  components: { AddCartModal },
  data() {
    return {
      addCartModalShow: false,
      clickedProduct: null
    };
  },
  methods: {
    ...mapActions(["getProducts"]),
    clickProduct(product) {
      this.clickedProduct = product;
      this.addCartModalShow = true;
    }
  },
  computed: {
    ...mapState(["products", "cart"])
  },
  async created() {
    await this.getProducts();
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Rubik&display=swap");
.single-product {
  width: 100%;
}
.single-product img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.bg {
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
  margin-top: -180px;
  height: 180px;
  font-family: "Rubik", sans-serif;
}
.bg .title {
  position: absolute;
  bottom: 24px;
  color: #dfe6e9;
  left: 8px;
  font-size: 20px;
  opacity: 0.8;
}

.bg .price {
  position: absolute;
  bottom: 8px;
  color: #dfe6e9;
  left: 8px;
  font-size: 16px;
  opacity: 0.5;
}
</style>
