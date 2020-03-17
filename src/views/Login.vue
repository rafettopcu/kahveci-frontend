<template>
  <div class="form-back">
    <a-row type="flex" align="middle" justify="center" class="form-back">
      <a-col :span="20">
        <div class="login-title">Giriş</div>
        <a-divider></a-divider>
        <a-form-item>
          <a-input
            class="login-input"
            placeholder="Email"
            v-model="loginData.email"
            size="large"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            class="login-input"
            type="password"
            placeholder="Password"
            size="large"
            v-model="loginData.password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loginLoading"
            ghost
            @click="clickLogin"
            class="login-form-button"
            block
            shape="round"
            size="large"
          >
            Giriş yap
          </a-button>
          <router-link :to="{ name: 'register' }">
            <div class="register-block">
              Kayıt ol!
            </div>
          </router-link>
        </a-form-item>
      </a-col>
    </a-row>
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
  height: 100%;
}

.login-title {
  color: white;
  font-size: 30px;
}
.login-input input {
  border-radius: 60px !important;
  background: white;
}
.register-block {
  margin-top: 12px;
  color: white !important;
  text-align: center;
}
</style>
