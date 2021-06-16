<template>
  <div class="container">
    <div class="search input-group mb-3 col-md-6">
      <div class="input-group-prepend">
        <button class="btn btn-outline-info dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ filter }}</button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#" @click="filter = 'Stelle'">Stelle</a>
          <a class="dropdown-item" href="#" @click="filter = 'Use Case'">Use Case</a>
        </div>
      </div>
      <input type="text" @keyup.enter="enterQuery" v-model="input" class="form-control" aria-describedby="basic-addon1">
      <div class="input-group-prepend">
        <button class="btn btn-primary" @click="enterQuery"  type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </div>
    <p>
      <span v-if="init">Please insert search query</span>
      <span v-else-if="loading">loading...</span>
      <span v-else>{{ count }} results found, showing {{ parseInt(offset) + 1 }}-{{ (parseInt(offset) + limit) > count ? count : (parseInt(offset) + limit) }}</span>
    </p>
    <p>
      <button class="btn btn-outline-primary navButton" :disabled="!previous" @click="send(previous)">Previous</button>
      <label for="limit">Results per page:</label>
      <input type="number" id="limit" v-model="limitField" class="form-control limit" />
      <button class="btn btn-outline-primary navButton" :disabled="!next" @click="send(next)">Next</button>
    </p>
    <data-table :entries="results" :key="renderKey" />
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from './DataTable';

export default {
  name: 'Search',
  data() {
    return {
      input: '',
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
      filter: 'Stelle',
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
      (urlProvided ? axios(url) : axios('https://mmp.acdh-dev.oeaw.ac.at/api/stelle/', {
        params: {
          format: 'json',
          zitat_lookup: 'icontains',
          zitat: this.input,
          limit: this.limit,
        }
      }))
      .then((res) => {
        console.log(res.data);
        this.count = res.data.count;
        this.results = res.data.results;
        this.next = res.data.next;
        this.previous = res.data.previous;

        if (!this.count) this.loading = false;
        for (let i = 0; i < this.results.length; i += 1) {
          this.loading = true;
          this.results[i].autor = [];
          const authorArray = this.results[i].text.autor;

          for (let j = 0; j < authorArray.length; j += 1) {

            axios(authorArray[j])
            .then(res => {
              this.results[i].autor.push(res.data.name);
              if (j == authorArray.length - 1) {
                this.renderKey += 1;
                this.loading = false;
              }
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
    console.log(this.offsetProp);
    if (this.offsetProp) this.offset = parseInt(this.offsetProp);
    if (this.$route.params.search) {
      this.input = this.$route.params.search;
      this.send();
    }
  },
};
</script>
<style scoped>
  .search {
    margin: auto;
  }
  .navButton {
    min-width: 100px;
    margin: 0 10px;
  }
  .limit {
    width: 80px;
    display: inline-block;
  }
  label {
    margin-right: 5px;
  }
</style>
