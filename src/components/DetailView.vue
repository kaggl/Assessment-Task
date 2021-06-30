<template>
  <div class="container">
    <table class="table" id="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">{{ $t('content') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in Object.keys(filteredObject)">
          <td scope="row">{{ key }}</td>
          <td scope="row">{{ Array.isArray(filteredObject[key]) ? filteredObject[key].join(', ') : filteredObject[key] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="leaflet col-sm-6" v-if="geoJson.count && geoJson.features[0].geometry">
        <leaflet :data="geoJson" />
      </div>
      <div class="visualization col-sm-6">
        <visualization :graph="graph" height="500" />
      </div>
    </div>
    <div class="buttonContainer">
      <button class="btn btn-primary" @click="fullObject =! fullObject">{{ fullObject ? $t('hideJson') : $t('showJson') }}</button>
    </div>
    <pre v-if="fullObject">
      {{ JSON.stringify(detailObject, null, '\t') }}
    </pre>
  </div>
</template>

<script>
import axios from 'axios';

import config from '/detailView.config';
import Visualization from './Visualization2D';
import Leaflet from './Leaflet';

export default {
  name: 'DetailView',
  data() {
    return {
      detailObject: {},
      fullObject: false,
      graph: {
        "nodes": [],
        "edges": [],
        "types": {
          "nodes": [],
          "edges": [],
        },
      },
      geoJson: {
        "type": "FeatureCollection",
        "features": []
      },
    };
  },
  components: {
    Visualization,
    Leaflet,
  },
  methods: {
    getLocaleKeyFromEn(key) {
      return config.attributes.find(x => x.name.en == key).name[this.$i18n.locale];
    },
    getDetails(id) {
      axios(`https://mmp.acdh-dev.oeaw.ac.at/api/stelle/${id}`, {
        params: {
          format: 'json',
        }
      })
      .then((res) => {
        console.log('Stelle', res.data);
        this.detailObject = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getKeywordGraph(id) {
      axios('https://mmp.acdh-dev.oeaw.ac.at/archiv/keyword-data/', {
        params: {
          rvn_stelle_key_word_keyword: id,
        }
      })
      .then(res => {
        // console.log('res', res.data);
        this.graph = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getLocaleName(obj) {
      if (this.$i18n.locale == 'de' || !obj.[`name_${this.$i18n.locale}`]) return obj.name_antik || obj.name;
      else return obj.[`name_${this.$i18n.locale}`];
    },
    getGeoJson(id) {
      axios('https://mmp.acdh-dev.oeaw.ac.at/api/spatialcoverage/', {
        params: {
          format: 'json',
          stelle: id,
        }
      })
      .then(res => {
        console.log('geojson', res.data);
        this.geoJson = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  computed: {
    graphWidth() {
      return this.$refs.table?.width;
    },
    filteredObject() {
      const retObj = {};
      const obj = this.detailObject;

      if (!Object.keys(obj).length) return retObj;

      for (let i = 0; i < config.attributes.length; i += 1) {
        retObj[config.attributes[i].name[this.$i18n.locale]] = eval(`obj.${config.attributes[i].attr}`);
      }

      const authorLocale = this.getLocaleKeyFromEn('Author');
      for (let i = 0; i < retObj[authorLocale].length; i += 1) {
        if (retObj[authorLocale][i].includes('https://')) {
          axios(retObj[authorLocale][i])
          .then((res) => {
            retObj[authorLocale][i] = this.getLocaleName(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }

      const placeLocale = this.getLocaleKeyFromEn('Place');
      for (let i = 0; i < retObj[placeLocale].length; i += 1) {
        if (retObj[placeLocale][i].includes('https://')) {
          axios(retObj[placeLocale][i])
          .then((res) => {
            retObj[placeLocale][i] = this.getLocaleName(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }

      const keywordsLocale = this.getLocaleKeyFromEn('Keywords');
      retObj[keywordsLocale] = retObj[keywordsLocale].map(x => x.stichwort);
      // console.log('filteredObject', retObj);
      return retObj;
    },
  },
  mounted() {
    // console.log('config', config);
    const stelleId = this.$route.params.id;

    console.log('stelle', stelleId);

    this.getDetails(stelleId);
    this.getKeywordGraph(stelleId);
    this.getGeoJson(stelleId);
  }
}
</script>

<style scoped>
  .buttonContainer {
    text-align: center;
    margin: 20px 0;
  }
  .leaflet {
    height: 500px;
  }
  div {
    text-align: left;
  }
  pre {
    max-width: 100vw;overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
</style>
<i18n>
{
  "en": {
    "content": "Content",
    "showJson": "Show full JSON Object",
    "hideJson": "Hide full JSON Object",
  },
  "de": {
    "content": "Inhalt",
    "showJson": "Ganzes JSON Objekt anzeigen",
    "hideJson": "Ganzes JSON Objekt verbergen",
  }
}
</i18n>
