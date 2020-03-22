<template>
  <div style="height:100% !important">
    <a-layout>
      <a-layout-header
        :style="{
          position: 'fixed',
          width: '100%',
          background: '#fff',
          padding: '0px',
          zIndex: 100,
          top: headerTop > 0 ? -headerTop + 'px' : 0,
          left: '0px'
        }"
        class="toolbarShadow navbar"
        :class="{ 'navbar-hidden': !showNavbar }"
      >
        <a-row type="flex" style="width:100%;text-align:center;height:100%">
          <a-col :span="4" @click="showDrawer = !showDrawer">
            <font-awesome-icon v-ripple icon="bars" style="font-size:20px;" />
          </a-col>
          <a-col :span="16">
            <center>
              <router-link :to="{ name: 'home' }">
                <div class="logo">kahveci</div>
              </router-link>
            </center>
          </a-col>
          <a-col :span="4" @click="qrDrawerShow = true" v-if="user">
            <font-awesome-icon v-ripple icon="qrcode" style="font-size:20px;" />
          </a-col>
        </a-row>
      </a-layout-header>
    </a-layout>
    <Drawer v-if="user" v-model="showDrawer" />
    <a-drawer
      v-if="user"
      height="100%"
      placement="bottom"
      :visible="qrDrawerShow"
      @close="qrDrawerShow = false"
    >
      <div style="height:100%">
        <a-row type="flex" justify="center">
          <a-col style="margin-top:128px">
            <h3>QR Kodunuz</h3>
            <hr />
            <qrcode :value="user._id" :options="{ width: 300 }"></qrcode>
            <hr />
          </a-col>
        </a-row>
      </div>
    </a-drawer>
    <a-layout
      id="components-layout-demo-custom-trigger"
      style="height:100% !important"
    >
      <a-row type="flex" justify="center" style="height:100% !important">
        <a-col
          :lg="{ span: lgSize }"
          :sm="{ span: smSize }"
          :md="{ span: mdSize }"
          :xs="{ span: xsSize }"
          style="margin-top:64px;"
        >
          <router-view></router-view>
        </a-col>
      </a-row>
    </a-layout>
  </div>
</template>
<script>
import Drawer from "./components/Drawer";
import { mapActions, mapState } from "vuex";
import router from "./router";
export default {
  components: { Drawer },
  data() {
    return {
      showNavbar: true,
      showDrawer: false,
      headerTop: 0,
      qrDrawerShow: false
    };
  },
  methods: {
    ...mapActions(["getMe"])
  },
  computed: {
    ...mapState(["user"]),
    lgSize() {
      return router.currentRoute.name === "dashboard" ? 24 : 12;
    },
    mdSize() {
      return router.currentRoute.name === "dashboard" ? 24 : 12;
    },
    smSize() {
      return 24;
    },
    xsSize() {
      return 24;
    }
  },
  async created() {
    if (
      !(
        router.currentRoute.name === "login" ||
        router.currentRoute.name === "register"
      )
    )
      await this.getMe();
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Lobster&display=swap");

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 56px;
  padding: 5px 24px;
  cursor: pointer;
  float: left;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.logo {
  width: 200px;
  height: 100%;
  font-family: "Lobster", cursive;
  font-size: 24px;
  color: #764c24;
}

.ant-drawer-body {
  padding: 0px !important;
}
.threedot {
  position: absolute !important;
  top: 0px !important;
}
.navbar {
  height: 64px;
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 15px rgba(71, 120, 120, 0.2);
  transform: translate3d(0, 0, 0);
  transition: 0.25s all ease-out;
}
.navbar.navbar-hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
.toolbarqr {
  font-size: 14px;
  line-height: 1;
  color: #3498db;
  margin-right: 14px;
  vertical-align: middle;
}
</style>
