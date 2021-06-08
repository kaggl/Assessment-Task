<template>
  <div>
    <div class="search input-group mb-3">
      <input type="text" @keyup.enter="send" v-model="input" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
      <div class="input-group-prepend">
        <button class="btn btn-outline-primary" @click="send"  type="button">Submit</button>
      </div>
    </div>
    <p>
      <span v-if="init">Please insert search query</span>
      <span v-else-if="loading">loading...</span>
      <span v-else>{{ count }} results found, showing {{ parseInt(offset) + 1 }}-{{ (parseInt(offset) + limit) > count ? count : (parseInt(offset) + limit) }}</span>
    </p>
    <p>
      <input type="button" class="btn btn-outline-primary navButton" :disabled="!previous" @click="send(previous)" value="Previous" />
      Results per page: <input type="number" @keyup.enter="send" v-model="limitField" class="form-control limit" />
      <input type="button" class="btn btn-outline-primary navButton" :disabled="!next" @click="send(next)" value="Next" />
    </p>
    <table class="table" id="table">
      <thead>
        <tr>
          <th scope="col">Label</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col" class="keyword">Associated Keywords</th>
          <th scope="col">Written</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="res in results" :key="res.legacy_pk">
          <td>{{ res.display_label }}</td>
          <td><a :href="res.url.replace('?format=json', '')">{{ res.text.title }}</a></td>
          <td>{{ res.autor.join(", ") }}</td>
          <td>{{ res.key_word.map(x => x.stichwort).join(", ") }}</td>
          <td>{{ res.text.start_date }} - {{ res.text.end_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      input: "",
      results: [],
      loading: false,
      count: 0,
      init: true,
      next: null,
      previous: null,
      offset: 0,
      limit: 20,
      limitField: 20,
    };
  },
  methods: {
    send(url) {
      this.init = false;
      this.loading = true;
      if (typeof url == "string") {
        console.log(url);
        const urlParams = new URLSearchParams(url);
        this.offset = urlParams.get('offset') ? urlParams.get('offset') : 0;
      } else {
        this.limit = parseInt(this.limitField)
        this.offset = 0;
      }
      (typeof url == "string" ? axios(url) : axios("https://mmp.acdh-dev.oeaw.ac.at/api/stelle/", {
        params: {
          format: "json",
          zitat_lookup: "icontains",
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

          for (let j = 0; j < this.results[i].text.autor.length; j += 1) {
            axios(this.results[i].text.autor[j])
            .then(res => {
              this.results[i].autor.push(res.data.name);
              if (j == this.results[i].text.autor.length - 1) {
                this.$forceUpdate();
                this.loading = false;
              }
            })
          }
        }
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
  table {
    margin: auto;
    width: 80vw;
  }
  .search {
    width: 30vw;
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
</style>
