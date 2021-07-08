<template>
  <div>
    <visualization
    :graph="getResults('keyword')"
    :onNodeClick="nodeClick"
    height="500" />
    {{ getDetails('keyword') }}
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Visualization from './Visualization2D';

export default {
  components: {
    Visualization
  },
  methods: {
    ...mapMutations([
      'setDetails',
    ]),
    nodeClick(node) {
      console.log(node);
      this.setDetails({name: 'keyword', obj: node});
    },
  },
  computed: {
    ...mapGetters([
      'getResults',
      'getDetails',
    ]),
  },
}
</script>

<style lang="css" scoped>
</style>
