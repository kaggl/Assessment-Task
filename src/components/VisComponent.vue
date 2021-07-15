<template>
  <div>
    <visualization
    :graph="getResults('keyword')"
    :onNodeClick="nodeClick"
    height="500" />
    <p>
      <node-details v-if="getDetails('keyword').id" />
    </p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Visualization from './Visualization2D';
import NodeDetails from './NodeDetails';

export default {
  components: {
    Visualization,
    NodeDetails,
  },
  methods: {
    ...mapMutations([
      'setDetails',
    ]),
    nodeClick(node) {
      console.log('node clicked', node);
      this.debounce(this.setDetails({name: 'keyword', obj: node}), 500);
    },
    debounce(func, time) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, time);
      };
    }
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
