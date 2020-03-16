<template>
  <div>
    <a-row type="flex" v-if="cart && cart.length > 0">
      <a-col :span="24" v-for="(item, index) in cart" :key="index">
        <a-row
          type="flex"
          justify="end"
          class="cart-item-card-buttons"
          :gutter="6"
        >
          <a-col>
            <a-button
              shape="circle"
              icon="minus"
              size="small"
              @click="
                item.count > 0
                  ? updateCartProductCount({ product: item, c: -1 })
                  : () => {}
              "
            ></a-button>
          </a-col>
          <a-col>{{ item.count }}</a-col>
          <a-col
            ><a-button
              shape="circle"
              icon="plus"
              size="small"
              @click="updateCartProductCount({ product: item, c: 1 })"
            ></a-button
          ></a-col>
          <a-col v-if="item.count === 0">
            <a-button
              type="danger"
              size="small"
              @click="removeProductFromCart(item)"
              >Sepetten çıkar</a-button
            >
          </a-col>
        </a-row>
        <div class="cart-item-card">
          <a-row type="flex">
            <a-col :span="16">
              <div class="cart-item-card-title">{{ item.name }}</div>
              <div class="cart-item-card-subtitle">{{ item.price }} ₺</div>
            </a-col>
            <a-col :span="8">
              <img class="cart-item-card-img" :src="item.photo" alt="" />
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <div v-else>
      <a-result status="404">
        <template v-slot:extra>
          <router-link :to="{ name: 'products' }">
            <a-button shape="round">Ürünler</a-button>
          </router-link>
        </template>
        <template v-slot:subTitle>
          <span style="color:white;opacity:.5">
            Sepetinize ürün eklemek için Ürünler sayfamızı ziyater
            edebilirsiniz.
          </span>
        </template>
        <template v-slot:title>
          <span style="color:white">
            Sepetiniz boş
          </span>
        </template>
      </a-result>
    </div>

    <a-row type="flex" align="middle" justify="space-between" class="footer">
      <a-col style="height: 100%;vertical-alignment:middle;padding-top:4px"
        >{{ totalAmmount }} ₺</a-col
      >
      <a-col style="height: 100%;"
        ><a-button shape="round" size="large"
          >Alışverişi tamamla</a-button
        ></a-col
      >
    </a-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["cart", "user"]),
    totalAmmount() {
      const func = (a, b) => a + b;
      return this.cart.map(x => x.count * x.price).reduce(func, 0);
    }
  },
  methods: {
    ...mapMutations(["updateCartProductCount", "removeProductFromCart"])
  }
};
</script>
<style>
.cart-item-card {
  height: 160px;
  background: #fff;
  margin: 14px;
  border-radius: 10px;
}
.cart-item-card-img {
  height: 160px;
  width: 100%;
  object-fit: cover;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.cart-item-card-title {
  margin: 36px 0 0 24px;
  color: #2f3542;
  font-size: 22px;
}
.cart-item-card-subtitle {
  margin-left: 24px;
  color: #2f3542;
  font-size: 26px;
}
.cart-item-card-buttons {
  z-index: 100;
  position: absolute;
  bottom: 26px;
  left: 30px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 84px;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  background: white;
  font-size: 28px;
  padding: 18px 32px;

  text-align: center;
}
</style>
