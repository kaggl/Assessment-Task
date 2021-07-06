<template>
  <visualization :graph="getResults('keyword')" height="500" />
</template>

<script>
import { mapGetters } from 'vuex';

import Visualization from './Visualization2D';

export default {
  components: {
    Visualization
  },
  computed: {
    ...mapGetters([
      'getResults',
    ]),
  },
}
</script>

<style lang="css" scoped>
</style>
