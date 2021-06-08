<template>
  <div>
    <h1>Assessment Task</h1>
    <p>
      <input type="text" @keyup.enter="send" v-model="input" />
      <input type="button" class="btn btn-outline-primary" @click="send" value="Submit" />
    </p>
    <p>
      <span v-if="init">Please insert search query</span>
      <span v-else-if="loading">loading...</span>
      <span v-else>{{ count }} results found, {{ results.length }} shown</span>
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
    };
  },
  methods: {
    send() {
      console.log(this.input);
      this.init = false;
      this.loading = true;
      console.log(this.loading);
      axios("https://mmp.acdh-dev.oeaw.ac.at/api/stelle/", {
        params: {
          format: "json",
          zitat_lookup: "icontains",
          zitat: this.input,
          limit: 20,
        }
      })
      .then((res) => {
        console.log(res.data);
        this.count = res.data.count;
        this.results = res.data.results;
        for (let i = 0; i < this.results.length; i += 1) {
          this.loading = true;
          this.results[i].autor = [];
          for (var j = 0; j < this.results[i].text.autor.length; j += 1) {
            axios(this.results[i].text.autor[j])
            .then(res => {
              this.results[i].autor.push(res.data.name);
              this.$forceUpdate();
            })
          }

        }
        /*
        this.results = res.data.results;
        this.loading = false;
        */
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
</style>
