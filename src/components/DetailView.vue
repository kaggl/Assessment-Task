<template lang="html">
  <div :key="renderKey">
    {{ detailObject }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DetailView',
  data() {
    return {
      renderKey: 0,
      detailObject: {},
    };
  },
  methods: {
    getDetails(id) {
      axios(`https://mmp.acdh-dev.oeaw.ac.at/api/stelle/${id}`, {
        params: {
          format: 'json',
        }
      })
      .then((res) => {
        console.log(res);
        this.detailObject = res.data
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  mounted() {
    this.getDetails(this.$route.params.id)
  }
}
</script>

<style lang="css" scoped>
</style>
