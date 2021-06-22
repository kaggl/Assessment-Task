<template>
  <div id="visWrapper">
  </div>
</template>

<script>
import ForceGraph from 'force-graph';

import testGraph from '@/assets/testGraph.json'

export default {
  name: 'Visualization',
  data() {
    return {
      graphRender: ForceGraph(),
    };
  },
  props: {
    backgroundColor: String,
    dagMode: {
      type: String,
      default: null,
    },
    graph: Object,
    highlightedNodeIds: Set, // TODO
    onNodeClick: Function,
    onSimulationEnd: Function,
    onSimulationTick: Function,
    onZoom: Function,
    selectedNodeIds: Set, // TODO
    showNeighborsOnly: {
      type: Boolean,
      default: false,
    }, // TODO
    width: Number,

  },
  methods: {
    transformedData(obj) {
      const retObj = {};

      retObj.nodes = this.addColorAndType(obj.nodes, obj.types.nodes);
      retObj.links = this.addColorAndType(obj.edges, obj.types.edges);

      return retObj;
    },
    addColorAndType(arr, typeArr) {
      console.log('typeArr', typeArr, 'arr', arr);
      arr = arr.map(node => {
        const nodeType = typeArr.filter(type => type.id == node.type)[0];
        if (nodeType) node.color = nodeType.color;
        return node;
      });
      return arr;
    }
  },
  mounted() {
    console.log(testGraph);
    const data = this.graph || testGraph;
    const graphDom = this.graphRender(document.getElementById('visWrapper'))

    if (this.height) graphDom.height(this.height);
    if (this.width) graphDom.width(this.width);

    graphDom
      .nodeLabel('label')
      .backgroundColor(this.backgroundColor || null)
      .dagMode(this.dagMode)
      .onNodeClick(this.onNodeClick)
      .onEngineStop(this.onSimulationEnd)
      .onEngineTick(this.onEngineEnd)
      .onZoom(this.onZoom)
      .graphData(this.transformedData(data));
  },
}
</script>

<style lang="css" scoped>
</style>
