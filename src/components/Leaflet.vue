<template :key="renderKey">
  <l-map
    v-if="data.count"
    ref="map"
    :zoom="8"
    :center="center"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-geo-json
      :geojson="data"
    />
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LGeoJson, LTileLayer } from '@vue-leaflet/vue-leaflet';

// import testMap from '@/assets/testMap.json';

export default {
  data() {
    return {
      renderKey: 0,
    };
  },
  props: {
    data: {
      type: Object,
      default: {
        type: 'FeatureCollection',
        features: [],
      },
    },
  },
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  computed: {
    center() {
      if (!this.data?.count) return [[0, 0], [0, 0]];

      console.log('features', this.data.features);

      const coords = this.data.features[0].bbox;

      console.log(coords);

      return [(coords[1] + coords[3]) / 2, (coords[0] + coords[2]) / 2];
    },
  },
  updated() {
    // this.renderKey += 1;
  },
};
</script>


<style lang="css" scoped>
  l-map {
    height: 500px;
  }
</style>
