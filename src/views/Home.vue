<template>
  <div style="margin-top:16px">
    <a-row type="flex">
      <a-col :span="24">
        <a-card class="wallet-card">
          <a-row :gutter="20" justify="center" align="middle">
            <a-col :span="6" style="text-align:right;">
              <font-awesome-icon icon="wallet" />
            </a-col>
            <a-col :span="18" class="wallet-text">
              Hesabıma Para Yükle
              <div class="wallet-subtext">Cüzdanınızda 25₺ var.</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <hr />
    <a-row type="flex">
      <a-col :span="24">
        <a-card class="score-card">
          <a-row :gutter="20" justify="center" align="middle">
            <a-col :span="10" style="text-align:right;">
              <!-- <font-awesome-icon icon="star" /> -->
              <a-progress
                type="dashboard"
                strokeColor="#764c24"
                :percent="(scoreCoffee / maxCoffee) * 100"
              >
                <template v-slot:format="">
                  <div
                    style="position:absolute;bottom:-32px;left:56px;color:#dfe6e9"
                  >
                    {{ scoreCoffee }}
                  </div>
                  <font-awesome-icon
                    style="font-size:30px;color:#dfe6e9"
                    icon="coffee"
                  />
                </template>
              </a-progress>
            </a-col>
            <a-col :span="14" class="score-text">
              <h2>Puanlarınız</h2>
              <div class="score-subtext">
                Ücretsiz kahve kazanmak için {{ maxCoffee - scoreCoffee }} kahve
                daha almalısınız.
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <hr />

    <div class="main-list-item">
      <font-awesome-icon icon="store" />
      Mağazalar
    </div>
    <hr />

    <div class="main-list-item">
      <font-awesome-icon icon="envelope" />
      Bildirimler
    </div>
    <hr />

    <div class="main-list-item">
      <font-awesome-icon icon="shopping-cart" />
      Sepetim
    </div>
    <hr />
  </div>
</template>
<script>
export default {
  data() {
    return {
      maxCoffee: 15,
      scoreCoffee: 4
    };
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
  margin: 12px !important;
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
  margin: 8px 16px;
}
.main-list-item svg {
  margin-right: 12px;
}
hr {
  margin: 18px 0;
  border-top: 0.02px solid grey;
  border-color: grey;
}
</style>
