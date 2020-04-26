<template>
  <div>
    <a-drawer
      style="background:red;z-index:111111"
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
      <hr style="margin:20px 0" />

      <router-link
        v-for="(item, index) in menu"
        :key="index"
        :to="item.to"
        @click="onClose"
      >
        <hr v-if="item.hr" />
        <div
          class="drawer-list-item"
          v-if="!item.roles || item.roles.includes(role)"
        >
          <font-awesome-icon :icon="item.icon" />
          {{ item.text }}
        </div>
      </router-link>

      <div class="drawer-footer" @click="clickSignOut">
        Çıkış yap
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import router from "../router";

export default {
  props: ["value"],
  data() {
    return {
      menu: [
        {
          text: "Cüzdanım",
          to: { name: "wallet" },
          icon: "wallet"
        },
        {
          text: "Mağazalar",
          to: { name: "stores" },
          icon: "store"
        },
        {
          text: "Ürünler",
          to: { name: "products" },
          icon: "coffee"
        },
        {
          text: "Sepetim",
          to: { name: "cart" },
          icon: "shopping-cart"
        },
        {
          text: "Siparişlerim",
          to: { name: "orders" },
          icon: "clock"
        },
        {
          hr: true,
          text: "Karekod Oku",
          to: { name: "read-qr" },
          icon: "qrcode",
          roles: [1, 2]
        }
      ]
    };
  },
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
    ...mapState(["user"]),
    ...mapGetters(["role"])
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
