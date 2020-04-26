<template>
  <div>
    <VueQrReader
      :video-width="screenWidth"
      :stop-on-scanned="qrState"
      :responsive="true"
      style="margin:0"
      @code-scanned="codeArrived"
    ></VueQrReader>

    <div style="color:white;margin-top:12px" v-if="scannedUser">
      <center>
        <div style="font-size:32px">{{ scannedUser.fullName }}</div>
        <div style="font-size:20px">{{ scannedUser.score }} puanı var.</div>
        <div style="font-size:16px;opacity:.5">
          {{ Math.floor(scannedUser.score / 10) }} ücretsiz kahve alabilir
        </div>
        <a-button
          style="margin-top:12px;"
          size="large"
          shape="round"
          @click="use"
          :disabled="scannedUser.score < 10"
          >Puan Kullan</a-button
        >
      </center>
    </div>
  </div>
</template>

<script>
import VueQrReader from "vue-qr-reader/dist/lib/vue-qr-reader.umd.js";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: { VueQrReader },
  data() {
    return {
      qrState: false,
      code: "",
      icon: "info",
      msg: ""
    };
  },
  methods: {
    ...mapActions(["getUser", "useScore"]),
    ...mapMutations(["USE_SCORE"]),
    async codeArrived(code) {
      if (code != this.code) {
        this.code = code;
        await this.getUser(this.code);
        this.msg = code;
        this.icon = "info";
      }
    },
    async use() {
      await this.useScore(10);
    }
  },
  computed: {
    ...mapState(["scannedUser"]),
    screenWidth() {
      return window.screen.width;
    },
    screenHeight() {
      return window.screen.height;
    },
    alertColor() {
      return this.icon === "info"
        ? "#34ace0"
        : this.icon === "success"
        ? "#3ae374"
        : this.icon === "error"
        ? "#ff4d4d"
        : "white";
    }
  }
};
</script>

<style></style>
