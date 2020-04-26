<template>
  <div>
    <a-form>
      <a-form-item label="Ürün adı">
        <a-input v-model="product.name"></a-input>
      </a-form-item>
      <a-form-item label="Fiyat">
        <a-input v-model="product.price"></a-input>
      </a-form-item>
      <a-form-item label="Puan değeri var mı?">
        <a-checkbox v-model="product.hasScore"></a-checkbox>
      </a-form-item>
      <a-form-item label="Görsel linki">
        <a-input v-model="product.photo"></a-input>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" shape="round" @click="add">Ekle</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      product: {
        name: null,
        price: null,
        photo: null,
        hasScore: null
      }
    };
  },
  methods: {
    ...mapActions(["addProduct"]),
    async add() {
      this.loading = true;
      await this.addProduct(this.product);
      this.loading = false;
      this.$emit("input", false);
    }
  }
};
</script>
