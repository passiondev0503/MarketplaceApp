<template>
  <div>
    <!-- <p>We currently have two distribution centers.</p> -->
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        address:String
    },
  data() {
    return {
      markers:{},
      center:null
    };
  },
  created(){
      this.moveTo(this.address)
  },
  methods: {
    async moveTo(address) {
        const position= await this.geoCode(address)
      const { lat, lng } = position.locations;
      const map = await this.$refs.mapRef.$mapPromise;
      map.panTo({ lat, lng });
      this.$emit("loc",position.locations)
    },
    geoCode(searchVal) {
      const API_KEY = "AIzaSyCs-QKtNa_l3qyNxdpxi7YM7rRgpKvTJU8";
      const prm = axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${searchVal}&key=${API_KEY}`
        )
        .then((res) => {
    this.markers.position=res.data.results[0].geometry.location

          return {
            locations: res.data.results[0].geometry.location,
            name: res.data.results[0].formatted_address,
          };
        })
        .catch((err) => {
        });
      return prm;
    },
  },
};
</script>
