<template>
  <div style="height:100%;margin-top:-64px">
    <LoadCreditModal v-model="loadCreditModalShow" />
    <a-row type="flex" justify="center" style="height:100%" align="middle">
      <a-col>
        <center>
          <font-awesome-icon
            style="margin-top: 18px;margin-bottom: 18px;font-size:50px;color:#dfe6e9"
            icon="wallet"
          />
        </center>
        <div class="wallet-title">Cüzdanım</div>
        <hr />
        <a-row type="flex" justify="center" align="middle">
          <a-col>
            <div class="wallet-ammount">{{ user.wallet }} ₺</div>
            <a-button ghost shape="round" @click="loadCreditModalShow = true"
              >Bakiye yükle</a-button
            >
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import LoadCreditModal from "../components/LoadCreditModal";
import { mapState } from "vuex";
export default {
  components: { LoadCreditModal },
  data() {
    return {
      loadCreditModalShow: false
    };
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Rubik&display=swap");
.wallet-title {
  font-family: "Rubik", sans-serif;
  color: #dfe6e9;
  font-size: 30px;
}
.wallet-ammount {
  font-family: "Rubik", sans-serif;
  color: #00cec9;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
