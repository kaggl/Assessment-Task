<template>
  <div class="container">
    <div class="row">
      <div class="search input-group mb-3 col-md-6 offset-md-3">
        <input type="text" :placeholder="$t('keywords')" @keyup.enter="enterQuery" v-if="type == 'keyword'" v-model="keyInput" class="form-control" aria-describedby="basic-addon1">
        <input type="text" :placeholder="$t('stelle')" @keyup.enter="enterQuery" v-if="type == 'stelle'" v-model="input" class="form-control" aria-describedby="basic-addon1">
        <vue-bootstrap-typeahead
          type="text"
          placeholder="Use Case"
          @keyup="getKeywords"
          @keyup.enter="enterQuery"
          :data="keywordArr"
          v-if="advanced && type == 'stelle'"
          v-model="useCase"
          class="form-control"
          aria-describedby="basic-addon1"
          showAllResults="true"
          ref="useCase"
        />
        <div class="input-group-prepend">
          <button class="btn btn-primary" @click="enterQuery"  type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="col-md-2" v-if="type == 'stelle'">
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
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          :class="{ active: type == 'stelle' }"
          class="nav-link"
          :to="{ name: 'Search', params: { type: 'stelle', search: input }}">
            {{ $t('datatable') }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :class="{ active: type == 'keyword' }"
          class="nav-link"
          :to="{ name: 'Search', params: { type: 'keyword', search: input }}">
            {{ $t('visualization') }}
        </router-link>
      </li>
    </ul>
    <br />
    <p>
      <span v-if="init">{{ $t('query') }}</span>
      <span v-else-if="loading">{{ $t('loading') }}...</span>
      <span v-else-if="count && type == 'stelle'">{{ count }} {{ $t('results')}} {{ parseInt(offset) + 1 }}-{{ (parseInt(offset) + limit) > count ? count : (parseInt(offset) + limit) }}</span>
      <span v-else-if="keyResults.nodes.length && type == 'keyword'">{{ $t('keyResults', { nodes: keyResults.nodes.length, edges: keyResults.edges.length })}}</span>
      <span v-else>{{ $t('noResults') }}</span>
    </p>
    <p v-if="type == 'stelle'">
      <button class="btn btn-outline-primary navButton" :disabled="!previous" @click="send(previous)">{{ $t('previous') }}</button>
      <label for="limit">{{ $t('resultsperPage') }}:</label>
      <input type="number" id="limit" v-model="limitField" class="form-control limit" />
      <button class="btn btn-outline-primary navButton" :disabled="!next" @click="send(next)">{{ $t('next') }}</button>
    </p>
    <visualization v-if="type == 'keyword'" :graph="keyResults" height="500" />
    <data-table v-else :entries="results" :key="renderKey" />
  </div>
</template>

<script>
import axios from 'axios';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

import DataTable from './DataTable';
import Visualization from './Visualization2D';

export default {
  name: 'Search',
  data() {
    return {
      input: '',
      keyInput: '',
      useCase: '',
      keywordArr: [],
      keywordObj: [],
      results: [],
      keyResults: {
        "nodes": [],
        "edges": [],
        "types": {
          "nodes": [],
          "edges": []
        }
      },
      loading: false,
      count: 0,
      init: true,
      next: null,
      previous: null,
      offset: this.offsetProp,
      limit: 20,
      limitField: 20,
      renderKey: 0,
      keywordKey: 0,
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
    Visualization,
    VueBootstrapTypeahead,
  },
  methods: {
    send(url) {
      console.log('ref', this.$refs.useCase?.inputValue, this.useCase);
      const urlProvided = typeof url == 'string';
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

      console.log(this.advanced, this.useCaseInput);

      if (this.advanced && this.useCaseInput) params.use_case = this.getKeywordIdfromText(this.useCaseInput);

      console.log('params', params);

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
              // console.log('Autor', res.data);
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
    keywordSend() {
      this.loading = true;

      axios('https://mmp.acdh-dev.oeaw.ac.at/archiv/keyword-data/', {
        params: {
          stichwort_lookup: 'icontains',
          stichwort: this.keyInput,
          rvn_stelle_key_word_keyword__text__autor: this.keyInput,
          rvn_stelle_key_word_keyword	: this.keyInput,
          rvn_stelle_key_word_keyword__text: this.keyInput,
          rvn_stelle_key_word_keyword__text__autor__ort: this.keyInput,
        },
      })
      .then(res => {
        console.log(res.data);
        this.keyResults = res.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    enterQuery() {
      this.$router.push({
        name: 'Search',
        params: {
          type: this.type,
          search: this.type == 'stelle' ? this.input : this.keyInput,
          offsetProp: this.offset,
        }
      });
      this.init = false;

      if (this.type == 'stelle') this.send();
      else this.keywordSend();
    },
    getKeywords(str) {
      axios('https://mmp.acdh-dev.oeaw.ac.at/archiv-ac/usecase-autocomplete/', {
        params: {
          q: this.useCase,
        }
      })
      .then(res => {
        console.log(res.data);
        this.keywordObj = res.data.results;
        this.keywordArr = this.keywordArr.concat(this.keywordObj.map(x => x.selected_text));

        this.keywordObj = [...new Set(this.keywordObj)];
        this.keywordArr = [...new Set(this.keywordArr)];
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getKeywordIdfromText(str) {
      return this.keywordObj.filter(x => x.selected_text == this.useCaseInput)[0]?.id;
    },
  },
  computed: {
    type() {
      return this.$route.params.type
    },
    useCaseInput() {
      return this.$refs.useCase?.inputValue;
    },
  },
  mounted() {
    if (this.offsetProp) this.offset = parseInt(this.offsetProp);
    if (this.$route.params.search) {
      this.init = false;
      if (this.type == 'stelle') {
        this.input = this.$route.params.search;
        this.send();
      } else {
        this.keyInput = this.$route.params.search;
        this.keywordSend();
      }
    }
  },
};
</script>
<style>
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
  .keywordWrapper {
    width: 100%;
    height: 500px;
  }
  input[type='search'] {
    border: 0px;
    height: 24px;
    padding: 0px;
  }
  label {
    margin-right: 5px;
  }
</style>

<i18n>
{
  "en": {
    "stelle": "Passage",
    "keywords": "Keywords",
    "advancedSearch": "Advanced Search",
    "query": "Please insert search query",
    "loading": "loading",
    "results": "results found, showing",
    "keyResults": "{nodes} nodes and {edges} edges found!",
    "noResults": "No results",
    "resultsperPage": "Results per page",
    "previous": "Previous",
    "next": "Next",
    "datatable": "Data Table",
    "visualization": "Visualization",
  },
  "de": {
    "stelle": "Stelle",
    "keywords": "Stichwörter",
    "advancedSearch": "Erweiterte Suche",
    "query": "Bitte Suchbegriff eingeben",
    "loading": "lädt",
    "results": "Ergebnisse gefunden, zeige",
    "keyResults": "{nodes} Knoten und {edges} Verbindungen gefunden!",
    "noResults": "Keine Suchergebnisse",
    "resultsperPage": "Ergebnisse pro Seite",
    "previous": "Vorherige",
    "next": "Nächste",
    "datatable": "Tabelle",
    "visualization": "Visualisierung",
  }
}
</i18n>
