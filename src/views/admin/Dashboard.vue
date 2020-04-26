<template>
  <div>
    <a-row type="flex">
      <a-col
        :span="6"
        v-for="(item, index) in cards"
        :key="index"
        @click="show = item.slug"
      >
        <DashboardCard
          :title="item.title"
          :subTitle="item.subTitle"
          :bgColor="item.bgColor"
      /></a-col>
    </a-row>
    <div class="dashboard-table" v-if="show === 'products'">
      <ProductTable />
    </div>
    <div class="dashboard-table" v-if="show === 'caffes'">
      <StoreTable />
    </div>
  </div>
</template>

<script>
import ProductTable from "../../components/ProductTable";
import StoreTable from "../../components/StoreTable";

import DashboardCard from "../../components/DashboardCard";
export default {
  components: { DashboardCard, ProductTable, StoreTable },
  data() {
    return {
      show: "a",
      cards: [
        {
          title: "Ürünler",
          slug: "products",
          bgColor: "#6a89cc"
        },
        {
          title: "Mağazalar",
          slug: "caffes",
          bgColor: "#f8c291"
        },
        {
          title: "Kullanıcı",
          slug: "users",
          bgColor: "#38ada9"
        },
        {
          title: "Siparişler",
          slug: "orders",
          bgColor: "#b8e994"
        }
      ]
    };
  }
};
</script>

<style>
.dashboard-table {
  padding: 24px;
  background: #f5f6fa;
}
</style>
