<template>
  <a-modal
    :bodyStyle="{ borderRadius: '50px !important' }"
    centered
    :footer="null"
    :closable="false"
    v-model="value"
  >
    <div>
      <h2>{{ product.name }}</h2>
      <img class="modal-cart-image" :src="product.photo" alt="" />
      <h4>Fiyat : {{ product.price }}₺</h4>
      <br />
      <a-row type="flex" :gutter="10">
        <a-col :span="8">
          <a-input-number
            style="width:100%"
            v-model="productCount"
            :min="1"
            :max="10"
            size="large"
          />
        </a-col>
        <a-col :span="16">
          <a-button
            shape="round"
            block
            size="large"
            @click="clickAddCart({ product, productCount })"
          >
            <font-awesome-icon icon="shopping-cart" style="margin-right:4px" />
            Spete Ekle</a-button
          >
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return { productCount: 1 };
  },
  computed: {
    ...mapState(["cart"])
  },
  methods: {
    ...mapMutations(["addCart"]),
    clickAddCart(payload) {
      this.addCart(payload);
      this.value = false;
    }
  },
  created() {
    this.productCount = 1;
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
.modal-cart-image {
  width: 100%;
}
</style>
