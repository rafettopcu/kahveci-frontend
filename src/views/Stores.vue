<template>
  <div style="height:100%">
    <a-modal
      :bodyStyle="{ borderRadius: '50px !important' }"
      centered
      :footer="null"
      :closable="false"
      v-model="showStoreDetailModal"
    >
      <h2>Mekan</h2>
      <p>Yayla mah. Cengiz Topel cad. Gözdekent sit. D Blok Daire:5</p>
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
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="mark(m)"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showStoreDetailModal: false,
      center: { lat: 41.0082, lng: 28.9784 },
      markers: [{ position: { lat: 41.0082, lng: 28.9784 }, detail: "Mekan" }]
    };
  },
  methods: {
    mark() {
      this.showStoreDetailModal = true;
    }
  }
};
</script>
<style>
.ant-modal-content {
  border-radius: 30px !important;
}
</style>
