<template>
  <a-form
    style="margin-top:128px"
    id="components-form-demo-normal-login"
    class="login-form"
  >
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
      <a-button type="primary" @click="clickLogin" class="login-form-button">
        Log in
      </a-button>
      Or
      <a href="">
        register now!
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";
export default {
  data() {
    return {
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
        await this.doLogin(this.loginData);
        router.go("/");
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
</style>
