<template>
  <div ref="visWrapper" class="visualization" />
</template>

<script>
import ForceGraph from 'force-graph';

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
    graph: {
      type: Object,
      default: {
        "nodes": [],
        "edges": [],
        "types": {
          "nodes": [],
          "edges": []
        }
      }
    },
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
      return {
        nodes: this.addColorAndType(obj.nodes, obj.types.nodes),
        links: this.addColorAndType(obj.edges, obj.types.edges),
      };
    },
    addColorAndType(arr, typeArr) {
      // console.log('typeArr', typeArr, 'arr', arr);
      arr = arr.map(node => {
        const nodeType = typeArr.filter(type => type.id == node.type)[0];
        if (nodeType) node.color = nodeType.color;
        return node;
      });
      return arr;
    },
    setCanvas() {
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
        .graphData(this.transformedData(this.graph))
        /*
        .nodeCanvasObjectMode(() => 'after')
        .nodeCanvasObject((node, ctx) => {
          ctx.font = '3px Sans-Serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label.split(',')[0], node.x, node.y);
        })
        */
        .cooldownTicks(100)

        graphDom.onEngineStop(() => graphDom.zoomToFit(400));
    }
  },
  mounted() {
    this.setCanvas();
  },
  updated() {
    this.setCanvas();
  },
}
</script>
<style scoped>
  .visualization {
    border: solid 1px rgb(222, 226, 230);
    border-radius: 4px;
  }
</style>
