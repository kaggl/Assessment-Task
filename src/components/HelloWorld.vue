<template>
  <div>
    <h1>Assessment Task</h1>
    <input type="text" @keyup.enter="send" v-model="input" />
    <input type="button" @click="send" value="Submit" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      input: "",
    };
  },
  methods: {

    async send() {
      console.log(this.input);
      axios(`https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?format=json&zitat_lookup=icontains&zitat=${this.input}`, {
        // mode: 'cors',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
