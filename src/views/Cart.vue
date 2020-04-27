<template>
  <div style="margin-bottom:90px">
    <a-row type="flex" v-if="cart && cart.length > 0 && step === 1">
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
    <a-row v-else-if="cart && step === 2">
      <a-col style="margin:20px;color:white " v-if="user">
        <a-form>
          <a-form-item label="Ad Soyad">
            <a-input v-model="user.fullName"></a-input>
          </a-form-item>
          <a-form-item label="Adres">
            <a-textarea rows="5" v-model="user.address"></a-textarea>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-row v-else-if="cart && step === 3">
      <a-col style="margin:20px;color:white " v-if="user">
        <h2 style="color:white">Sepetim</h2>

        <table style="width:100%">
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.count }} adet</td>
            <td>{{ item.count * item.price }}₺</td>
          </tr>
          <tr style="border-top:1px solid grey">
            <td></td>
            <td></td>
            <td>{{ totalAmmount }}₺</td>
          </tr>
        </table>

        <br />
        <br />
        <br />
        <h2 style="color:white">Adres Bilgilerim</h2>
        <table style="width:100%">
          <tr>
            <td>Ad Soyad</td>
            <td>{{ user.fullName }}</td>
          </tr>
          <tr>
            <td>Adres</td>
            <td>{{ user.address }}</td>
          </tr>
        </table>
      </a-col>
    </a-row>
    <a-row v-else-if="cart && step === 4">
      <a-col>
        <a-result status="success">
          <template v-slot:title>
            <span style="color:white">Sipraişiniz başarıyla tamamlandı.</span>
          </template>
          <template v-slot:subTitle>
            <span style="color:grey"
              >Aldığınız ürünlerle {{ score }} puan kazandınız</span
            >
          </template>
        </a-result>
      </a-col>
    </a-row>
    <div v-else-if="!(cart && cart.length > 0)">
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
    <a-row type="flex" class="steps">
      <a-col class="step" :class="step > 1 ? 'passed-step' : ''" :span="8"
        ><span :style="{ color: step >= 1 ? 'white' : '#636e72' }"
          >Sepetim</span
        ></a-col
      >
      <a-col class="step" :class="step > 2 ? 'passed-step' : ''" :span="8"
        ><span :style="{ color: step >= 2 ? 'white' : '#636e72' }"
          >Adres</span
        ></a-col
      >
      <a-col class="step" :class="step > 3 ? 'passed-step' : ''" :span="8"
        ><span :style="{ color: step >= 3 ? 'white' : '#636e72' }"
          >Onayla</span
        ></a-col
      >
    </a-row>
    <a-row type="flex" align="middle" justify="space-between" class="footer">
      <a-col style="height: 100%;vertical-alignment:middle;padding-top:4px"
        >{{ totalAmmount }} ₺
      </a-col>
      <a-col style="height: 100%;">
        <span v-if="totalAmmount === 0" style="font-size:14px;color:grey"
          >Sepet Boş!</span
        >
        <a-button
          v-else-if="!(totalAmmount > user.wallet)"
          shape="round"
          size="large"
          @click="inc()"
          >{{
            step === 1
              ? "Sepeti onayla"
              : step === 2
              ? "Adresi onayla"
              : step === 3
              ? "Siparişi tamamla"
              : "Tamamlandı!"
          }}</a-button
        >

        <span v-else style="font-size:14px;color:red">Yetersiz bakiye!</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      step: 1,
      score: 0,
      addressUser: null
    };
  },
  created() {
    this.addressUser = { ...this.user };
  },
  computed: {
    ...mapState(["cart", "user"]),
    totalAmmount() {
      const func = (a, b) => a + b;
      return this.cart.map(x => x.count * x.price).reduce(func, 0);
    }
  },
  methods: {
    ...mapMutations(["updateCartProductCount", "removeProductFromCart"]),
    ...mapActions(["postOrder"]),
    async order() {
      await this.postOrder();
    },

    inc() {
      if (this.step === 1 && this.cart.length === 0) return;
      const func = (a, b) => a + b;
      if (this.step <= 3) this.step++;
      if (this.step === 2)
        this.score = this.cart
          .map(x => (x.hasScore ? x.count : 0))
          .reduce(func, 0);
      if (this.step === 4) this.order();
    }
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
  left: 0;
  width: 100%;
  height: 84px;
  /* border-top-left-radius: 22px; */
  /* border-top-right-radius: 22px; */
  background: white;
  font-size: 28px;
  padding: 18px 32px;

  text-align: center;
  position: fixed;
  z-index: 1000;

  -webkit-box-shadow: 0px -2px 139px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -2px 139px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px -2px 139px -2px rgba(0, 0, 0, 0.75);
}
.steps {
  left: 0;
  position: fixed;
  z-index: 1001;
  bottom: 84px;
  height: 6px;
  margin: 0;

  width: 100%;
  background: #b2bec3;
}
.step span {
  position: absolute;
  top: -22px;
  left: 0;
  color: white;
}
.passed-step {
  background: #00cec9;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.address-form {
  margin: 12px;
}
</style>
