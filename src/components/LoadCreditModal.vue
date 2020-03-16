<template>
  <a-modal
    :bodyStyle="{ borderRadius: '50px !important' }"
    centered
    :footer="null"
    :closable="false"
    v-model="value"
    @close="onClose"
  >
    <div v-if="!success && !error">
      <h2><font-awesome-icon icon="wallet" /> Cüzdanınız</h2>
      <p>
        Cüzdanınızda {{ user.wallet }}₺ var. Yüklemek istediğiniz miktarı
        giriniz.
      </p>
      <a-form layout="horizontal">
        <a-form-item label="Miktar">
          <a-input-number
            :min="0"
            :max="1000"
            style="width:100%"
            v-model="ammount"
          />
        </a-form-item>
        <a-form-item>
          <a-button :loading="buttonLoading" @click="load">Yükle</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-else-if="!error && success">
      <a-result
        status="success"
        title="Bakiye Yükleme İşlemi Başarılı!"
        :subTitle="`Yeni bakiyeniz ${user.wallet}₺`"
      >
        <template v-slot:extra>
          <a-button shape="round" @click="onClose">Kapat</a-button>
        </template>
      </a-result>
    </div>
    <div v-else-if="error">
      <a-result
        status="warning"
        title="Bir hata oluştu"
        sub-title="Girdiğiniz miktarı kontol ediniz."
      >
        <template v-slot:extra>
          <a-button
            type="primary"
            key="console"
            @click="
              success = false;
              error = false;
            "
            >Geri dön</a-button
          >
        </template>
      </a-result>
    </div>
  </a-modal>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ammount: 0,
      buttonLoading: false,
      success: false,
      error: false
    };
  },
  created() {
    this.success = false;
    this.error = false;
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["loadCredit"]),
    onClose() {
      this.success = false;
      this.error = false;
      this.value = false;
      this.$emit("input", this.value);
    },
    async load() {
      this.buttonLoading = true;
      try {
        await this.loadCredit(this.ammount);
        this.success = true;
      } catch (error) {
        this.error = true;
      }
      this.buttonLoading = false;
    }
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    }
  }
};
</script>
