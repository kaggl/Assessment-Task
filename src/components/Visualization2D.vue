<template>
  <div ref="visWrapper" class="visualization" />
</template>

<script>
import ForceGraph from 'force-graph';
import testGraph from '@/assets/testGraph.json'

export default {
  name: 'Visualization',
  data() {
    return {
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
    width: {
      type: String,
    },
    height: String,

  },
  methods: {
    transformedData(obj) {
      const retObj = {};

      retObj.nodes = this.addColorAndType(obj.nodes, obj.types.nodes);
      retObj.links = this.addColorAndType(obj.edges, obj.types.edges);

      return retObj;
    },
    addColorAndType(arr, typeArr) {
      // console.log('typeArr', typeArr, 'arr', arr);
      arr = arr.map(node => {
        const nodeType = typeArr.filter(type => type.id == node.type)[0];
        if (nodeType) node.color = nodeType.color;
        return node;
      });
      return arr;
    }
  },
  updated() {
    const data = this.graph;
    console.log(data);
    const graphDom = ForceGraph()(this.$refs.visWrapper);


    graphDom
      .nodeLabel('label')
      .height(this.height|| this.$refs.visWrapper.clientHeight)
      .width(this.width || this.$refs.visWrapper.clientWidth)
      .backgroundColor(this.backgroundColor || null)
      .dagMode(this.dagMode)
      .onNodeClick(this.onNodeClick)
      .onEngineStop(this.onSimulationEnd)
      .onEngineTick(this.onEngineEnd)
      .onZoom(this.onZoom)
      .graphData(this.transformedData(data));

      // console.log('wrapper', this.$refs.visWrapper);
  },
}
</script>
<style scoped>
  .visualization {
    border: solid 1px rgb(222, 226, 230);
    border-radius: 4px;
  }
</style>
