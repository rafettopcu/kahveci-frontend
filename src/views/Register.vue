<template>
  <div>
    <h2>Kaydol</h2>
    <a-divider></a-divider>
    <a-form>
      <a-form-item label="Ad soyad">
        <a-input v-model="registerData.fullName"></a-input>
      </a-form-item>
      <a-form-item label="Kullanıcı adı">
        <a-input v-model="registerData.username"></a-input>
      </a-form-item>
      <a-form-item label="Email">
        <a-input v-model="registerData.email"></a-input>
      </a-form-item>
      <a-form-item label="Parola">
        <a-input v-model="registerData.password"></a-input>
      </a-form-item>
      <a-form-item label="Parola Onay">
        <a-input v-model="registerData.password2"></a-input>
      </a-form-item>
      <a-form-item label="Adres">
        <a-textarea v-model="registerData.address"></a-textarea>
      </a-form-item>
      <a-form-item>
        <a-alert v-if="errorText" type="error" :message="errorText" banner />
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="registerLoading"
          type="primary"
          @click="clickRegister"
          >Kaydol</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
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
      } catch (error) {
        this.errorText = error.response.data.message;
      }
      this.registerLoading = false;
    }
  }
};
</script>
