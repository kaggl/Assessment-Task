<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h1>
          {{ removeRoot(getDetails('keyword').label) }}
          <span class="badge badge-pill badge-primary" v-if="count && !countLoading">{{ count }}</span>
        </h1>
      </div>
    </div>
    <div v-for="(node, i) in connections">
      <div
      class="card"
      :key="node.label+i"
      data-toggle="collapse"
      :data-target="`#${node.label+i}`"
      >
        <div class="card-header list">
          {{ removeRoot(getDetails('keyword').label) }} &harr; {{ removeRoot(node.label) }}
          <span class="badge badge-pill badge-primary" v-if="crossKeywordData[node.id]">{{ crossKeywordData[node.id].count }}</span>
        </div>
      </div>
      <div class="card-body collapse" :id="node.label+i">
        <data-table  v-if="crossKeywordData[node.id]" :data="crossKeywordData[node.id].results" />
        <!--
        <div v-for="stelle in crossKeywordData[node.id].results">
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

import DataTable from './DataTable';

export default {
  data() {
    return {
      count: 0,
      crossKeywordData: {},
      countLoading: false,
      connections: [],
    };
  },
  components : {
    DataTable,
  },
  methods: {
    removeRoot: str => str ? str.split(',')[0] : '',
    removeStringFromID: id => id ? id.replace('archiv__keyword__', '') : '',
    getConnectedNodesFromId(id) {
      console.count('getConnectedNodesFromId')
      const edges = this.getResults('keyword').edges.filter(x => x.source.id == id || x.target.id == id);
      let nodes = edges.map(x => [x.source, x.target])
      nodes = [].concat(...nodes);
      nodes = [...new Set(nodes)];
      nodes = nodes.filter(x => x != this.getDetails('keyword').label);

      this.getKeywordCount();
      console.log('nodes', nodes);
      return nodes;
    },
    getKeywordCount() {
      if (!this.getDetails('keyword').id) return;
      // this.countLoading = true;
      axios('https://mmp.acdh-dev.oeaw.ac.at/api/stelle/', { params: {
        key_word: this.removeStringFromID(this.getDetails('keyword').id),
      }})
      .then(res => {
        console.log('getKeywordCount', res.data.count);
        this.countLoading = false;
        this.count = res.data.count;
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCrossKeywordData(arr) {
      if (typeof arr == 'string') {
        this.getCrossKeywordData([arr, this.getDetails('keyword').id]);
        return;
      }
      let req = 'https://mmp.acdh-dev.oeaw.ac.at/api/stelle/'
      for (let i = 0; i < arr.length; i += 1) {
        req += (i == 0 ? '?' : '&');
        req += `key_word=${this.removeStringFromID(arr[i])}`;
      }
      axios(req)
        .then(res => {
          console.log('cross', res);
          this.crossKeywordData[arr[0]] = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  computed: {
    ...mapGetters([
      'getResults',
      'getDetails',
    ]),
    connections() {
      return this.getConnectedNodesFromId(this.getDetails('keyword').id);
    }
  },
  updated() {
    const nodes = this.getConnectedNodesFromId(this.getDetails('keyword').id);
    for (let i = 0; i < nodes.length; i += 1) {
      if (!this.crossKeywordData[nodes[i].id]?.count) {
        this.getCrossKeywordData(nodes[i].id)
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="css">
  .list {
    text-align: left;
  }
  .list:before {
    content: '\25BC ';
  }
  .collapsed.list:before {
    content: '\25B2 ';
  }
</style>
