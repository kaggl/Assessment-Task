<template :key="renderKey">
  <div>
    <l-map
      :zoom="3"
      style="height: 500px;"
      :center="center"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-geo-json :geojson="entries" />
    </l-map>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LGeoJson, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { mapGetters } from 'vuex';

// import testMap from '@/assets/testMap.json';

export default {
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
    ...mapGetters([
      'getResults',
    ]),
    center() {
      const features = this.entries.features
        .map(x => x.bbox)
        .filter(x => x);
      if (!features.length) return [0, 0];
      console.log('features', features);
      const retArray = [];
      for (let i = 0; i < 4; i += 1) {
        retArray.push(features.reduce((a, b) => a + b[i], 0) / features.length);
      }
      console.log('retArray', retArray);
      return [(retArray[1] + retArray[3]) / 2, (retArray[0] + retArray[2]) / 2];
    },
    entries() {
      return this.data.features.length ? this.data : this.getResults('map');
    },
  },
}
</script>
