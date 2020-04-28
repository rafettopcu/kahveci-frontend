<template>
  <div v-if="user">
    <LoadCreditModal v-model="loadCreditModalShow" />
    <a-row type="flex">
      <a-col :span="24" v-ripple @click="clickWallet">
        <a-card class="wallet-card">
          <a-row :gutter="20" justify="center" align="middle">
            <a-col :span="6" style="text-align:right;">
              <font-awesome-icon icon="wallet" />
            </a-col>
            <a-col :span="18" class="wallet-text">
              Cüzdanıma Para Yükle
              <div class="wallet-subtext">
                Cüzdanınızda
                <span style="font-size:24px;color:#55efc4"
                  >{{
                    user.wallet
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                  }}
                  ₺</span
                >
                var.
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <hr />
    <a-row type="flex">
      <a-col :span="24" v-ripple>
        <a-card class="score-card">
          <a-row :gutter="20" justify="center" align="middle">
            <a-col :span="10" style="text-align:right;">
              <!-- <font-awesome-icon icon="star" /> -->
              <a-progress
                type="dashboard"
                strokeColor="#55efc4"
                :percent="(user.score / maxCoffee) * 100"
              >
                <template v-slot:format="">
                  <div
                    style="position:absolute;bottom:-36px;left:56px;color:#dfe6e9"
                  >
                    {{ user.score }}
                  </div>
                  <font-awesome-icon
                    style="font-size:30px;"
                    :style="{
                      color: user.score < maxCoffee ? 'grey' : 'white'
                    }"
                    icon="coffee"
                  />
                </template>
              </a-progress>
            </a-col>
            <a-col :span="14" class="score-text">
              <h2>Puanlarınız</h2>
              <div class="score-subtext" v-if="user.score < maxCoffee">
                Ücretsiz kahve kazanmak için {{ maxCoffee - user.score }} kahve
                daha almalısınız.
              </div>
              <div v-else class="score-subtext">
                Topladğınız puanlarla
                {{ parseInt(user.score / maxCoffee, 10) }} ücretsiz kahve
                alabilirsiniz.
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <hr />
    <router-link :to="{ name: 'stores' }" v-ripple>
      <div class="main-list-item">
        <font-awesome-icon icon="store" />
        Mağazalar
      </div>
    </router-link>

    <hr />
    <router-link :to="{ name: 'cart' }" v-ripple>
      <div class="main-list-item" v-ripple>
        <font-awesome-icon icon="shopping-cart" />
        Sepetim
      </div>
    </router-link>
    <hr />
    <a-row type="flex">
      <a-col v-for="(item, index) in products" :key="index" :span="8">
        <MiniProductCard :product="item" />
      </a-col>
      <a-col :span="8">
        <MiniProductCard :product="null" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import LoadCreditModal from "../components/LoadCreditModal";
import MiniProductCard from "../components/MiniProductCard";
export default {
  components: { LoadCreditModal, MiniProductCard },
  data() {
    return {
      maxCoffee: 10,
      loadCreditModalShow: false
    };
  },
  async created() {
    await this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts"]),
    clickWallet() {
      this.loadCreditModalShow = true;
    }
  },
  computed: {
    ...mapState(["user", "products"])
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Rubik&display=swap");

.wallet-card {
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); */
  border: 0px !important;
  font-family: "Rubik", sans-serif;
  border-radius: 10px !important;
  background: #2d3436 !important;
  color: #dfe6e9 !important;

  font-size: 42px !important;
}
.wallet-text {
  font-size: 20px;
}
.wallet-subtext {
  font-size: 14px;
}
.score-card {
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); */
  border: 0px !important;
  text-align: center !important;
  padding-top: 32px !important;
  padding-bottom: 32px !important;
  font-family: "Rubik", sans-serif;
  border-radius: 10px !important;
  background: #2d3436 !important;
  color: #dfe6e9 !important;
  margin: 12px !important;
}
.score-card h2 {
  color: #dfe6e9;
}
.notification-text {
  font-size: 24px !important;
}
.main-list-item {
  color: #dfe6e9 !important;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  padding: 8px 16px;
}
.main-list-item svg {
  margin-right: 12px;
}
hr {
  margin: 0;
  border-top: 0.02px solid grey;
  border-color: grey;
}
</style>
