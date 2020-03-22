<template>
  <div>
    <a-row type="flex">
      <a-col :span="6" v-for="(item, index) in cards" :key="index">
        <DashboardCard
          :title="item.title"
          :subTitle="item.subTitle"
          :bgColor="item.bgColor"
      /></a-col>
    </a-row>
    <div class="dashboard-table">
      <ProductTable />
    </div>
  </div>
</template>

<script>
import ProductTable from "../../components/ProductTable";

import DashboardCard from "../../components/DashboardCard";
export default {
  components: { DashboardCard, ProductTable },
  data() {
    return {
      cards: [
        {
          title: "Ürünler",
          subTitle: "16 kayıt",
          bgColor: "#6a89cc"
        },
        {
          title: "Mağazalar",
          subTitle: "453 kayıt",
          bgColor: "#f8c291"
        },
        {
          title: "Kullanıcı",
          subTitle: "2224 kayıt",
          bgColor: "#38ada9"
        },
        {
          title: "Siparişler",
          subTitle: "5434 kayıt",
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
