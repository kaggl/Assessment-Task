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
        <input type="text" :placeholder="$t('stelle')" @keyup.enter="enterQuery" v-if="type == 'DataTable'" v-model="input" class="form-control" aria-describedby="basic-addon1">
        <input type="text" :placeholder="$t('author')" @keyup.enter="enterQuery" v-if="advanced && type == 'VisComponent'" v-model="keywordAuthor" class="form-control" aria-describedby="basic-addon1">
        <!--
        <input type="text" :placeholder="$t('keywords')" @keyup.enter="enterQuery"  v-model="mapInput" class="form-control" aria-describedby="basic-addon1">
      -->
        <vue-bootstrap-typeahead
          :placeholder="$t('keywords')"
          ref="mapKeywordRef"
          @input="getKeywords"
          @hit="selectedKeyword = $event"
          :data="keywordObj"
          :serializer="item => item.selected_text"
          v-if="type == 'Places'"
          class="form-control"
          aria-describedby="basic-addon1"
          showAllResults="true"
        />
        <vue-bootstrap-typeahead
          placeholder="Use Case"
          ref="useCaseRef"
          @input="getUseCases"
          @hit="selectedUseCase = $event"
          @keyup.enter="enterQuery"
          :data="keywordObj"
          :serializer="item => item.selected_text"
          v-if="advanced && type == 'DataTable'"
          class="form-control"
          aria-describedby="basic-addon1"
          showAllResults="true"
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
      <span v-else-if="getResults('map').features.length && type == 'Places'">{{ getResults('map').count }} {{ $t('mapResults') }}!</span>
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
      selectedKeyword: {},
      selectedUseCase: {},
      keywordObj: [],
      useCaseObj: [],
      keywordType: '',
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
      const urlProvided = typeof url == 'string';
      this.loading = true;
      if (urlProvided) {
        console.log(url);
        const urlParams = new URLSearchParams(url);
        this.offset = urlParams.get('offset') || 0;
      } else {
        this.limit = parseInt(this.limitField);
        this.offset = 0;
      }

      (urlProvided ? axios(url) : axios('https://mmp.acdh-dev.oeaw.ac.at/api/stelle/', { params: {
        format: 'json',
        zitat_lookup: 'icontains',
        zitat: this.input,
        limit: this.limit,
        use_case: (this.advanced && this.selectedUseCase) ? this.selectedUseCase.id : undefined
      }}))
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
    mapSend(id) {
      this.loading = true;
      axios('https://mmp.acdh-dev.oeaw.ac.at/api/spatialcoverage/', {
        params: {
          format: 'json',
          key_word: id || this.selectedKeyword.id || undefined,
        }
      })
      .then(res => {
        console.log('mapLocation', res.data);
        this.setResults({
          name: 'map',
          arr: res.data
        });
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });

    },
    enterQuery() {
      const params = {
        offsetProp: this.offset,
      }
      switch (this.type) {
        case 'DataTable':
          params.search = this.input;
          break;
        case 'VisComponent':
          params.search = this.keyInput;
          break;
        case 'Places':
          params.search = this.selectedKeyword.id;
          break;
        default: break;

      }
      this.$router.push({
        name: this.getCompNameFromType(this.type),
        params
      });
      this.init = false;

      console.log('keywordAuthor', this.keywordAuthor);

      if (this.type == 'DataTable') this.send();
      else if (this.type == 'Places') this.mapSend();
      else if (this.type == 'VisComponent' && this.keywordAuthor) this.keywordSendWithAuthor();
      else this.keywordSend()
    },
    getUsesCases() {
      console.log('useCaseInput', this.useCaseInput);
      axios('https://mmp.acdh-dev.oeaw.ac.at/archiv-ac/usecase-autocomplete/', {
        params: {
          q: this.useCaseInput,
        }
      })
      .then(res => {
        console.log('keyword auto', res.data);
        this.useCaseObj = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getKeywords() {
      console.log('keywordInput', this.useCaseInput);
      axios('https://mmp.acdh-dev.oeaw.ac.at/archiv-ac/keyword-autocomplete/', {
        params: {
          q: this.keywordInput,
        }
      })
      .then(res => {
        console.log('keyword auto', res.data);
        this.keywordObj = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  computed: {
    ...mapGetters([
      'getResults',
    ]),
    useCaseInput() {
      return this.$refs.useCaseRef?.inputValue;
    },
    keywordInput() {
      return this.$refs.mapKeywordRef?.inputValue;
    },
    type() {
      console.log(this.$route);
      return this.$route.name;
    },
  },
  mounted() {
    if (this.offsetProp) this.offset = parseInt(this.offsetProp);
    if (this.$route.params.search) {
      this.init = false;
      switch (this.type) {
        case 'DataTable':
          this.input = this.$route.params.search;
          this.send();
          break;
        case 'VisComponent':
          this.keyInput = this.$route.params.search;
          this.keywordSend();
          break;
        case 'Places':
          this.mapSend(this.$route.params.search);
          break;
        default: break;

      }
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
    "mapResults": "locations found",
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
    "mapResults": "Orte gefunden",
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
