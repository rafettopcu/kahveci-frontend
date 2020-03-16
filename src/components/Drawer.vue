<template>
  <div>
    <a-drawer
      style="background:red"
      placement="left"
      :closable="true"
      @close="onClose"
      :visible="value"
      :drawerStyle="{ backgroundColor: '#2d3436' }"
    >
      <a-row type="flex" justify="center" class="drawer-avatar">
        <a-col>
          <a-avatar
            src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
            :size="128"
          ></a-avatar>
        </a-col>
      </a-row>
      <div class="drawer-full-name">{{ user.fullName }}</div>
      <hr />
      <router-link :to="{ name: 'wallet' }" @click="onClose">
        <div class="drawer-list-item">
          <font-awesome-icon icon="wallet" />
          Cüzdanım
        </div>
      </router-link>
      <router-link :to="{ name: 'stores' }" @click="onClose">
        <div class="drawer-list-item">
          <font-awesome-icon icon="store" />
          Mağazalar
        </div>
      </router-link>
      <router-link :to="{ name: 'products' }" @click="onClose">
        <div class="drawer-list-item">
          <font-awesome-icon icon="coffee" />
          Ürünler
        </div>
      </router-link>
      <router-link :to="{ name: 'cart' }" @click="onClose">
        <div class="drawer-list-item">
          <font-awesome-icon icon="shopping-cart" />
          Sepetim
        </div>
      </router-link>

      <div class="drawer-footer" @click="clickSignOut">
        Çıkış yap
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import router from "../router";

export default {
  props: ["value"],
  methods: {
    ...mapActions(["doSignOut"]),
    onClose() {
      this.value = false;
      this.$emit("input", this.value);
    },
    async clickSignOut() {
      await this.doSignOut();
      router.go("/login");
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
.drawer-avatar {
  margin-top: 32px;
}
.drawer-list-item {
  color: white;
  margin: 24px 16px;
  font-size: 16px;
}
.drawer-list-item svg {
  margin-right: 6px;
}
.drawer-full-name {
  text-align: center;
  color: white;
  font-size: 20px;
  margin-top: 8px;
}
.drawer-footer {
  position: absolute;
  bottom: 0;
  margin: 12px;
  right: 0;
  font-size: 16px;
  color: grey;
}
</style>
