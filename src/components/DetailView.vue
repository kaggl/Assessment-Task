<template lang="html">
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
import config from '/detailView.config'

export default {
  name: 'DetailView',
  data() {
    return {
      detailObject: {},
      fullObject: false,
    };
  },
  methods: {
    getDetails(id) {
      axios(`https://mmp.acdh-dev.oeaw.ac.at/api/stelle/${id}`, {
        params: {
          format: 'json',
        }
      })
      .then((res) => {
        console.log('Stelle', res.data);
        this.detailObject = res.data;
        this.detailObject.autor = []
        const authorUrls = this.detailObject.text.autor;
        for (let i = 0; i < authorUrls.length; i += 1) {
          axios(authorUrls[i])
          .then((res) => {
            console.log('Autor', res.data);
            this.detailObject.autorLocale.push({
              de: res.data.name,
              en: res.data.name_en,
              fr: res.data.name_fr,
              gr: res.data.name_gr,
              it: res.data.name_it,
              lat: res.data.name_lat,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getLocaleKeyFromEn(key) {
      return config.attributes.find(x => x.name.en == key).name[this.$i18n.locale];
    },
    getLocaleAuthor(obj) {
      if (this.$i18n.locale == 'de' || !obj.[`name_${this.$i18n.locale}`]) return obj.name;
      else return obj.[`name_${this.$i18n.locale}`];
    },
  },
  computed: {
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
            console.log('Autor:', res.data);
            retObj[authorLocale][i] = this.getLocaleAuthor(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }

      const keywordsLocale = this.getLocaleKeyFromEn('Keywords');
      retObj[keywordsLocale] = retObj[keywordsLocale].map(x => x.stichwort);
      return retObj;
    },
  },
  mounted() {
    console.log('config', config);
    this.getDetails(this.$route.params.id)
  }
}
</script>

<style lang="css" scoped>
  div {
    text-align: left;
  }
  .buttonContainer {
    text-align: center;
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
