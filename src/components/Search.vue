<template>
  <div class="container">
    <div class="row">
      <div class="search input-group mb-3 col-md-6 offset-md-3">
        <input type="text" :placeholder="$t('stelle')" @keyup.enter="enterQuery" v-model="input" class="form-control" aria-describedby="basic-addon1">
        <input type="text" placeholder="Use Case" @keyup.enter="enterQuery" v-if="advanced" v-model="useCase" class="form-control" aria-describedby="basic-addon1">
        <div class="input-group-prepend">
          <button class="btn btn-primary" @click="enterQuery"  type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-check form-switch">
          <button class="btn">
            <input class="form-check-input" type="checkbox" id="checkbox" v-model="advanced">
            <label class="form-check-label" for="checkbox">
              {{ $t('advancedSearch') }}
            </label>
          </button>
        </div>
      </div>
    </div>
    <hr />
    <p>
      <span v-if="init">{{ $t('query') }}</span>
      <span v-else-if="loading">{{ $t('loading') }}...</span>
      <span v-else-if="count">{{ count }} {{ $t('results')}} {{ parseInt(offset) + 1 }}-{{ (parseInt(offset) + limit) > count ? count : (parseInt(offset) + limit) }}</span>
      <span v-else>{{ $t('noResults') }}</span>
    </p>
    <p>
      <button class="btn btn-outline-primary navButton" :disabled="!previous" @click="send(previous)">{{ $t('previous') }}</button>
      <label for="limit">{{ $t('resultsperPage') }}:</label>
      <input type="number" id="limit" v-model="limitField" class="form-control limit" />
      <button class="btn btn-outline-primary navButton" :disabled="!next" @click="send(next)">{{ $t('next') }}</button>
    </p>
    <!-- >
      <visualization2D />
    -->
    <data-table :entries="results" :key="renderKey" />
  </div>
</template>

<script>
import axios from 'axios';

import DataTable from './DataTable';
import Visualization2D from './Visualization2D';

export default {
  name: 'Search',
  data() {
    return {
      input: '',
      useCase: '',
      results: [],
      loading: false,
      count: 0,
      init: true,
      next: null,
      previous: null,
      offset: this.offsetProp,
      limit: 20,
      limitField: 20,
      renderKey: 0,
      advanced: false,
    };
  },
  props: {
    offsetProp: {
      type: String,
      default: '20',
    },
  },
  components: {
    DataTable,
    Visualization2D,
  },
  methods: {
    send(url) {
      const urlProvided = typeof url == 'string';
      this.init = false;
      this.loading = true;
      if (urlProvided) {
        console.log(url);
        const urlParams = new URLSearchParams(url);
        this.offset = urlParams.get('offset') ? urlParams.get('offset') : 0;
      } else {
        this.limit = parseInt(this.limitField)
        this.offset = 0;
      }

      const params = {
        format: 'json',
        zitat_lookup: 'icontains',
        zitat: this.input,
        limit: this.limit,
      }
      if (this.advanced && this.useCase) params.use_case = this.useCase;

      (urlProvided ? axios(url) : axios('https://mmp.acdh-dev.oeaw.ac.at/api/stelle/', { params }))
      .then((res) => {
        console.log(res.data);
        this.count = res.data.count;
        this.results = res.data.results;
        this.next = res.data.next;
        this.previous = res.data.previous;

        if (!this.count) this.loading = false;
        for (let i = 0; i < this.results.length; i += 1) {
          this.loading = true;
          this.results[i].autorLocale = []
          const authorArray = this.results[i].text.autor;

          for (let j = 0; j < authorArray.length; j += 1) {

            axios(authorArray[j])
            .then(res => {
              console.log('Autor', res.data);
              this.results[i].autorLocale.push({
                de: res.data.name,
                en: res.data.name_en,
                fr: res.data.name_fr,
                gr: res.data.name_gr,
                it: res.data.name_it,
                lat: res.data.name_lat,
              });
              this.loading = false;
            })
            .catch((error) => {
              console.log(error);
              this.loading = false;
            });

          }
        }
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    enterQuery() {
      this.$router.push({ name: 'Search', params: {
        search: this.input,
        offsetProp: this.offset,
      } });
      this.send()
    },
  },
  mounted() {
    console.log(Visualization2D);
    if (this.offsetProp) this.offset = parseInt(this.offsetProp);
    if (this.$route.params.search) {
      this.input = this.$route.params.search;
      this.send();
    }
  },
};
</script>
<style scoped>
  .navButton {
    min-width: 100px;
    margin: 0 10px;
  }
  .limit {
    width: 80px;
    display: inline-block;
  }
  .inline-link {
    padding: 5px;
  }
  label {
    margin-right: 5px;
  }
</style>

<i18n>
{
  "en": {
    "stelle": "Passage",
    "advancedSearch": "Advanced Search",
    "query": "Please insert search query",
    "loading": "loading",
    "results": "results found, showing",
    "noResults": "No results",
    "resultsperPage": "Results per page",
    "previous": "Previous",
    "next": "Next",
  },
  "de": {
    "stelle": "Stelle",
    "advancedSearch": "Erweiterte Suche",
    "query": "Bitte Suchbegriff eingeben",
    "loading": "lädt",
    "results": "Ergebnisse gefunden, zeige",
    "noResults": "Keine Suchergebnisse",
    "resultsperPage": "Ergebnisse pro Seite",
    "previous": "Vorherige",
    "next": "Nächste",
  }
}
</i18n>
