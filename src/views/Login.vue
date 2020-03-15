<template>
  <div class="form-back">
    <a-form id="components-form-demo-normal-login" class="login-form">
      <h1>Giriş</h1>
      <a-divider></a-divider>
      <a-form-item>
        <a-input placeholder="Email" v-model="loginData.email">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          placeholder="Password"
          v-model="loginData.password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox>
          Remember me
        </a-checkbox>
        <a class="login-form-forgot" href="">
          Forgot password
        </a>
        <a-button
          :loading="loginLoading"
          type="primary"
          @click="clickLogin"
          class="login-form-button"
        >
          Log in
        </a-button>
        Or
        <a href="">
          register now!
        </a>
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
      loginLoading: false,
      loginData: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions(["doLogin"]),
    async clickLogin() {
      try {
        this.loginLoading = true;
        await this.doLogin(this.loginData);
        router.go("/");
        this.loginLoading = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.form-back {
  margin-top: 128px;
  margin-left: 10px;
  margin-right: 10px;
  background: #fff !important;
  padding: 20px;
  border-radius: 20px;
}
.form-back h1 {
  color: #34495e;
}
</style>
