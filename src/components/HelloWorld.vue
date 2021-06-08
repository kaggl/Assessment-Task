<template>
  <div>
    <h1>Assessment Task</h1>
    <input type="text" @keyup.enter="send" v-model="input" />
    <input type="button" @click="send" value="Submit" />
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
    };
  },
  methods: {
    async send() {
      console.log(this.input);
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
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>
