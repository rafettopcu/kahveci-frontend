<template>
  <div>
    <a-row type="flex">
      <a-col class="order-card" v-for="(item, index) in orders" :key="index">
        <span class="date">
          {{ new Date(item.date).toLocaleString() }}
        </span>
        <div class="orders-products">
          <div
            v-for="(product, index) in item.products"
            :key="'c' + index"
            style="margin:4px 0;"
          >
            <a-avatar :src="product.photo"></a-avatar> {{ product.name }}
          </div>
        </div>
        <div class="orders-total-price">{{ totalPrice(item.products) }} ₺</div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  methods: {
    ...mapActions(['getMeOrders']),
    totalPrice(products) {
      const func = (a, b) => a + b;
      return products.map(x => x.price).reduce(func, 0);
    }
  },
  computed: {
    ...mapState(['orders'])
  },
  async created() {
    await this.getMeOrders();
  }
};
</script>
<style>
.order-card {
  width: 100%;
  border-radius: 20px;
  color: white;
  margin: 12px 24px;
  border: 1px solid grey;
  padding: 12px 12px 20px 12px;
}
.date {
  position: absolute;
  right: 14px;
  top: 8px;
  color: grey;
}
.orders-products {
  margin-left: 12px;
  margin-top: 22px;
}
.orders-total-price {
  position: absolute;
  right: 14px;
  font-size: 16px;
  bottom: 10px;
}
</style>
