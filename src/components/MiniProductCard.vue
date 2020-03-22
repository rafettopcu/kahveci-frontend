<template>
  <div>
    <AddCartModal v-model="addCartModalShow" :product="product" />
    <div class="product-card" @click="clickProduct">
      <img :src="product.photo" alt="" class="product-card-image" />
      <div class="product-card-bg">
        <div class="product-card-name ">{{ product.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import AddCartModal from "../components/AddCartModal";
export default {
  components: { AddCartModal },
  props: ["product"],
  data() {
    return {
      addCartModalShow: false
    };
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
