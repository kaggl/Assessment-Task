<template>
  <table class="table" id="table" :key="renderKey">
    <thead>
      <tr>
        <th scope="col">{{ $t('label') }}</th>
        <th scope="col">{{ $t('title') }}</th>
        <th scope="col">{{ $t('author') }}</th>
        <th scope="col">{{ $t('keywords') }}</th>
        <th scope="col">{{ $t('written') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="res in entriesWithAuthor" :key="res.legacy_pk">
        <td scope="row">{{ res.display_label }}</td>
        <td scope="row">
          <router-link :to="{ name: 'Detail', params: { id: getIdFromUrl(res.url) }}">{{ res.text.title }}</router-link>
        </td>
        <td scope="row" >{{ res.autorLocale ? localeAuthors(res.autorLocale).join(", ") : '' }}</td>
        <td scope="row">{{ res.key_word.map(x => x.stichwort).join(", ") }}</td>
        <td scope="row">{{ res.text.start_date || 'unknown' }} - {{ res.text.end_date || 'unknown' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'DataTable',
  data() {
    return {
      authorObj: {},
      renderKey: 0,
    };
  },
  props: [
    'data'
  ],
  computed: {
    ...mapGetters([
      'getResults',
    ]),
    entries() {
      return this.data || this.getResults('passage');
    },
    entriesWithAuthor() {
      const retData = this.entries;
      for (let i = 0; i < this.entries.length; i += 1) {
        retData[i].autorLocale = this.authorObj[retData[i]?.url];
      }
      return retData;
    }
  },
  methods: {
    ...mapMutations([
      'addAuthorsToPassages',
    ]),
    getIdFromUrl: url => url.match(/(\d+)/)[0],
    localeAuthors(arr) {
      return arr ? arr.map(x => x[this.$i18n.locale]) : [];
    },
    addAuthors() {
      if (!this.entries.length) return;
      for (let i = 0; i < this.entries.length; i += 1) {
        const authorArray = this.entries[i].text.autor;
        this.authorObj[this.entries[i].url] = [];

        for (let j = 0; j < authorArray.length; j += 1) {
          axios(authorArray[j])
          .then(res => {
            console.log('Autor', res.data);
            this.authorObj[this.entries[i].url].push({
              de: res.data.name,
              en: res.data.name_en,
              fr: res.data.name_fr,
              gr: res.data.name_gr,
              it: res.data.name_it,
              lat: res.data.name_lat,
            });
            this.renderKey -=- 1;
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
    },
  },
  watch: {
    entries() {
      this.addAuthors();
    },
  },
}
</script>

<style scoped>
  th {
    border-top: 0;
  }
</style>

<i18n>
{
  "en": {
    "label": "Label",
    "title": "Title",
    "author": "Author",
    "keywords": "Associated Keywords",
    "written": "Written",
  },
  "de": {
    "label": "Label",
    "title": "Titel",
    "author": "Autor",
    "keywords": "Stichwörter",
    "written": "Geschrieben",
  }
}
</i18n>
