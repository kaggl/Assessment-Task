<template>
  <div class="container">
    <div class="row">
      <div class="search input-group mb-3 col-md-6 offset-md-3">
        <div class="input-group-prepend" v-if="type == 'VisComponent' && advanced">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ keywordType ? $t(keywordType) : '' }}</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" @click.prevent="keywordType = undefined" href="#">{{ $t('all') }}</a>
            <a class="dropdown-item" @click.prevent="keywordType = 'Schlagwort'" href="#">{{ $t('Schlagwort') }}</a>
            <a class="dropdown-item" @click.prevent="keywordType = 'Eigenname'" href="#">{{ $t('Eigenname') }}</a>
          </div>
        </div>
        <input type="text" :placeholder="$t('keywords')" @keyup.enter="enterQuery" v-if="type == 'VisComponent'" v-model="keyInput" class="form-control" aria-describedby="basic-addon1">
        <input type="text" :placeholder="$t('keywords')" @keyup.enter="enterQuery" v-if="type == 'Places'" v-model="mapInput" class="form-control" aria-describedby="basic-addon1">
        <input type="text" :placeholder="$t('stelle')" @keyup.enter="enterQuery" v-if="type == 'DataTable'" v-model="input" class="form-control" aria-describedby="basic-addon1">
        <input type="text" :placeholder="$t('author')" @keyup.enter="enterQuery" v-if="advanced && type == 'VisComponent'" v-model="keywordAuthor" class="form-control" aria-describedby="basic-addon1">
        <vue-bootstrap-typeahead
          type="text"
          placeholder="Use Case"
          @keyup="getKeywords"
          @keyup.enter="enterQuery"
          :data="keywordArr"
          v-if="advanced && type == 'DataTable'"
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
      <div class="col-md-2" v-if="['DataTable', 'VisComponent'].includes(type)">
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
          :class="{ active: type == 'DataTable' }"
          class="nav-link"
          :to="{ name: 'DataTable' }">
            {{ $t('datatable') }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :class="{ active: type == 'VisComponent' }"
          class="nav-link"
          :to="{ name: 'VisComponent' }">
            {{ $t('visualization') }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :class="{ active: type == 'Places' }"
          class="nav-link"
          :to="{ name: 'Places' }">
            {{ $t('map') }}
        </router-link>
      </li>
    </ul>
    <br />
    <p>
      <span v-if="init">{{ $t('query') }}</span>
      <span v-else-if="loading">{{ $t('loading') }}...</span>
      <span v-else-if="count && type == 'DataTable'">{{ count }} {{ $t('results')}} {{ parseInt(offset) + 1 }}-{{ (parseInt(offset) + limit) > count ? count : (parseInt(offset) + limit) }}</span>
      <span v-else-if="getResults('keyword').nodes.length && type == 'VisComponent'">{{ $t('keyResults', { nodes: getResults('keyword').nodes.length, edges: getResults('keyword').edges.length })}}</span>
      <span v-else>{{ $t('noResults') }}</span>
    </p>
    <p v-if="type == 'DataTable'">
      <button class="btn btn-outline-primary navButton" :disabled="!previous" @click="send(previous)">{{ $t('previous') }}</button>
      <label for="limit">{{ $t('resultsperPage') }}:</label>
      <input type="number" id="limit" v-model="limitField" class="form-control limit" />
      <button class="btn btn-outline-primary navButton" :disabled="!next" @click="send(next)">{{ $t('next') }}</button>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import { mapGetters, mapMutations } from 'vuex';

import DataTable from './DataTable';
import VisComponent from './VisComponent';
import Leaflet from './Leaflet';

export default {
  name: 'Search',
  data() {
    return {
      input: '',
      keyInput: '',
      mapInput: '',
      useCase: '',
      keywordArr: [],
      keywordObj: [],
      keywordType: '',
      mapResults: [],
      loading: false,
      count: 0,
      init: true,
      next: null,
      previous: null,
      limit: 20,
      limitField: 20,
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
    VisComponent,
    Leaflet,
    VueBootstrapTypeahead,
  },
  methods: {
    ...mapMutations([
      'setResults',
      'addAuthorsToPassages',
    ]),
    getIdFromUrl: url => parseInt(url.split('/').filter(x => parseInt(x))[0]),
    getCompNameFromType(type) {
      const dict = {
        stelle: 'DataTable',
        keyword: 'VisComponent',
        map: 'Places',
      }
      return dict[type];
    },
    send(url) {
      console.log('ref', this.$refs.useCase?.inputValue, this.useCase);
      const urlProvided = typeof url == 'string';
      this.loading = true;
      if (urlProvided) {
        console.log(url);
        const urlParams = new URLSearchParams(url);
        this.offset = urlParams.get('offset') || 0;
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

      console.log('useCase', this.useCase, this.useCaseInput);
      if (this.advanced && this.useCaseInput) params.use_case = this.getKeywordIdfromText(this.useCaseInput);

      console.log('params', params);

      (urlProvided ? axios(url) : axios('https://mmp.acdh-dev.oeaw.ac.at/api/stelle/', { params }))
      .then((res) => {
        console.log(res.data);
        this.count = res.data.count;
        // this.results = res.data.results;
        this.setResults({
          name: 'passage',
          arr: res.data.results
        });
        this.next = res.data.next;
        this.previous = res.data.previous;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    keywordSendWithAuthor() {
      this.loading = true;

      axios('https://mmp.acdh-dev.oeaw.ac.at/api/autor/', {
        params: {
          name: this.keywordAuthor,
          name_en: this.keywordAuthor,
          name_lookup: 'icontains',
          name_en_lookup: 'icontains',
        }
      })
      .then(res => {
        console.log('author', res.data);
        this.keywordSend(this.getIdFromUrl(res.data.results[0].url));
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    keywordSend(authorId) {
      this.loading = true;

      const params = {
        stichwort: this.keyInput || undefined,
        stichwort_lookup: 'icontains',
        art: this.keywordType || undefined,
        rvn_stelle_key_word_keyword__text__autor: authorId || undefined,
      };

      axios('https://mmp.acdh-dev.oeaw.ac.at/archiv/keyword-data/', { params })
      .then(res => {
        console.log(res.data);
        this.setResults({
          name: 'keyword',
          arr: res.data
        });
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    mapSend() {
      this.loading = true;
      axios('https://mmp.acdh-dev.oeaw.ac.at/api/spatialcoverage/', {
        params: {
          format: 'json',
        }
      })
      .then(res => {
        console.log(res.data);
        this.mapResults = res.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });

    },
    enterQuery() {
      this.$router.push({
        name: this.getCompNameFromType(this.type),
        params: {
          search: this.type == 'DataTable' ? this.input : this.keyInput,
          offsetProp: this.offset,
        }
      });
      this.init = false;

      console.log('keywordAuthor', this.keywordAuthor);

      if (this.type == 'DataTable') this.send();
      else if (this.type == 'Places') this.mapSend();
      else if (this.type == 'VisComponent' && this.keywordAuthor) this.keywordSendWithAuthor();
      else this.keywordSend()
    },
    getKeywords() {
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
    getKeywordIdfromText() {
      return this.keywordObj.filter(x => x.selected_text == this.useCaseInput)[0]?.id;
    },
  },
  computed: {
    ...mapGetters([
      'getResults',
    ]),
    type() {
      console.log(this.$route);
      return this.$route.name;
    },
    useCaseInput() {
      return this.$refs.useCase?.inputValue;
    },
  },
  mounted() {
    if (this.offsetProp) this.offset = parseInt(this.offsetProp);
    if (this.$route.params.search) {
      this.init = false;
      if (this.type == 'DataTable') {
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
    "all": "All",
    "author": "Author",
    "stelle": "Passage",
    "keywords": "Keywords",
    "Schlagwort": "Keyword",
    "Eigenname": "Proper Name",
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
    "map": "Map"
  },
  "de": {
    "all": "Alle",
    "author": "Autor",
    "stelle": "Stelle",
    "keywords": "Stichwörter",
    "Schlagwort": "Schlagwort",
    "Eigenname": "Eigenname",
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
    "map": "Karte"
  }
}
</i18n>
