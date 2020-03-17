<template>
  <div style="height:100%">
    <a-modal
      v-if="clickedCaffe"
      :bodyStyle="{ borderRadius: '50px !important' }"
      centered
      :footer="null"
      :closable="false"
      v-model="showStoreDetailModal"
    >
      <h2>{{ clickedCaffe.branch_name }}</h2>
      <h3>{{ clickedCaffe.district_name }} / {{ clickedCaffe.city }}</h3>
      <h4>{{ clickedCaffe.phone_number }}</h4>
      <p>{{ clickedCaffe.address }}</p>
    </a-modal>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in caffes"
        :position="{ lat: m.lat, lng: m.lng }"
        :clickable="true"
        @click="mark(m)"
      />
    </GmapMap>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      caffes: null,
      clickedCaffe: null,
      showStoreDetailModal: false,
      center: { lat: 41.0082, lng: 28.9784 },
      markers: [{ position: { lat: 41.0082, lng: 28.9784 }, detail: "Mekan" }]
    };
  },
  computed: {},
  methods: {
    ...mapActions(["getAllCaffes"]),
    mark(c) {
      this.clickedCaffe = c;
      this.showStoreDetailModal = true;
    }
  },
  async created() {
    const caffes = await this.getAllCaffes();
    this.caffes = caffes;
  }
};
</script>
<style>
.ant-modal-content {
  border-radius: 30px !important;
}
</style>
