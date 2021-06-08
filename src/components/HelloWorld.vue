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
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Label</th>
          <th scope="col">Title</th>
          <th scope="col">Quote</th>
          <th scope="col">commentary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="res in results" :key="res.legacy_pk">
          <td>{{ res.display_label }}</td>
          <td>{{ res.text.title }}</td>
          <td>{{ res.zitat }}</td>
          <td>{{ res.text.kommentar }}</td>
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
    async send() {
      console.log(this.input);
      this.init = false;
      this.loading = true;
      console.log(this.loading);
      axios("https://mmp.acdh-dev.oeaw.ac.at/api/stelle/", {
        params: {
          format: "json",
          zitat_lookup: "icontains",
          zitat: this.input,
        }
      })
      .then((res) => {
        console.log(res.data);
        this.results = res.data.results;
        this.count = res.data.count;
        this.loading = false;
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
  th {
    width: 35vw;
  }
  th:nth-of-type(2), th:first-of-type {
    width: 15vw
  }
</style>
