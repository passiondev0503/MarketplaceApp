<template>
  <section>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 480px"
    >
      <GmapMarker
        :position="marker.position"
        :clickable="true"
        :draggable="true"
        @click="center = marker.position"
      />
    </GmapMap>
  </section>
</template>


<script>
export default {
  name: "map-details",
  props: ["stay"],
  data() {
    return {
      marker: {
        position: {
          lat: 0,
          lng: 0,
        },
      },
      center: { lat: 0, lng: 0},
    };
  },
  created() {
    this.setMap();
  },
  methods: {
    setMap() {
      const lat = this.stay.loc.lat;
      const lng = this.stay.loc.lng;

      this.marker.position = { lat: lat, lng: lng };
      this.center = { lat: lat, lng: lng };
    },
    moveTo(position) {
      const { lat, lng } = position;
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat, lng });
      });
    },
  },
  computed: {},
};
</script>

