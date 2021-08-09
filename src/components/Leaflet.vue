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
    <div v-for="(feature, i) in featureList">
      <div
      class="card"
      :key="i+feature.properties.key_word.url"
      data-toggle="collapse"
      :data-target="`#${i+feature.properties.key_word.url}`"
      >
        <div class="card-header list">
          {{ feature.properties.key_word.stichwort }}
          <span class="badge badge-pill badge-primary">{{ feature.properties.stelle.length }}</span>
        </div>
      </div>
      <div class="card-body collapse" :id="i+feature.properties.key_word.url">
        <data-table :data="feature.properties.stelle" />
      </div>
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { latLngBounds, latLng } from 'leaflet';
import { LMap, LGeoJson, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { mapGetters } from 'vuex';

import DataTable from './DataTable';

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
    DataTable,
  },
  methods: {
    boundsUpdated(val) {
      console.log(val, this.bounds);
    },
  },
  computed: {
    ...mapGetters([
      'getResults',
    ]),
    featureList() {
      const features = this.entries.features.map(x => ({
        passages: x.properties.stelle,
        key_word: x.properties.key_word.stichwort
      }));
      console.log(features);
      return this.entries.features;
    },
    bounds() {
      return latLngBounds([29.22889003019423, -19.687500000000004], [62.103882522897884, 110.39062500000001]);
    },
    center() {
      const features = this.entries.features
        .map(x => x.bbox)
        .filter(x => x);
      if (!features.length) return [0, 0];
      console.log('features', this.entries.features, this.entries.features.map(x => x.properties));
      const retArray = [];
      for (let i = 0; i < 4; i += 1) {
        retArray.push(features.reduce((a, b) => a + b[i], 0) / features.length);
      }
      return [(retArray[1] + retArray[3]) / 2, (retArray[0] + retArray[2]) / 2];
    },
    entries() {
      return this.data.features.length ? this.data : this.getResults('map');
    },
  },
}
</script>
