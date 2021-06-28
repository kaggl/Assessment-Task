<template>
  <l-map ref="map" :zoom="8" :center="center">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-geo-json :geojson="geojson"></l-geo-json>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LGeoJson, LTileLayer } from '@vue-leaflet/vue-leaflet';

import testMap from '@/assets/testMap.json'

export default {
  data() {
    return {
      polygon: [],
    };
  },
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  computed: {
    geojson: () => testMap,
    center() {
      const coords = testMap.features[0].bbox;

      console.log(coords);

      return [(coords[1] + coords[3]) / 2, (coords[0] + coords[2]) / 2];
    },
  },
};
</script>


<style lang="css" scoped>
  l-map {
    height: 400px;
  }
</style>
