<template>
  <div class="register-back">
    <h2 style="color:white">Kaydol</h2>
    <a-divider></a-divider>
    <a-form class="regiter-form">
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Ad Soyad
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.fullName"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Kullanıcı adı
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.username"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Email
          </span>
        </template>
        <a-input class="register-input" v-model="registerData.email"></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Parola
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.password"
          type="password"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Parola Onay
          </span>
        </template>
        <a-input
          class="register-input"
          v-model="registerData.password2"
          type="password"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <template v-slot:label>
          <span style="color:white">
            Adres
          </span>
        </template>
        <a-textarea
          class="register-input"
          v-model="registerData.address"
        ></a-textarea>
      </a-form-item>
      <a-form-item v-if="errorText">
        <a-alert v-if="errorText" type="error" :message="errorText" banner />
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="registerLoading"
          @click="clickRegister"
          ghost
          shape="round"
          block
          size="large"
          >Kaydol</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      registerLoading: false,
      errorText: null,
      registerData: {
        fullName: null,
        username: null,
        email: null,
        password: null,
        password2: null,
        address: null
      }
    };
  },
  methods: {
    ...mapActions(["doRegister"]),
    async clickRegister() {
      this.registerLoading = true;
      try {
        await this.doRegister(this.registerData);
        router.push("/login");
      } catch (error) {
        this.errorText = error.response.data.message;
      }
      this.registerLoading = false;
    }
  }
};
</script>
<style scoped>
.register-back {
  padding: 16px 16px 0 16px;
}

.regiter-form label {
  color: white !important;
}
.register-input {
  border-radius: 14px !important;
  background: white;
}
</style>
