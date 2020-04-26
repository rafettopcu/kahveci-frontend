<template>
  <div>
    <div
      class="dashboard-card"
      :style="{ background: bgColor, color: 'white' }"
    >
      <div v-if="!loading">
        <div class="dashboard-title">{{ title }}</div>
        <div class="dashboard-subtitle">{{ subTitle }}</div>
      </div>
      <a-row
        type="flex"
        justify="center"
        align="middle"
        v-else
        class="dashboard-loading"
      >
        <a-col>
          <a-spin class="dashboard-loading">
            <a-icon
              slot="indicator"
              type="loading"
              style="font-size: 48px;color:white;opacity:.4"
              spin
            />
          </a-spin>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Rubik&display=swap");

.dashboard-card {
  /* background: #82ccdd; */
  height: 160px;
  border-radius: 4px;
  margin: 16px;
  font-family: "Rubik", sans-serif;
  color: white;
  cursor: pointer;
}
.dashboard-title {
  padding: 20px 0 0 16px;
  font-size: 26px;
  color: white !important;
}
.dashboard-subtitle {
  padding-left: 16px;

  font-size: 16px;
  color: #dfe6e9;
}
.dashboard-loading {
  height: 100%;
}
</style>
