<template lang="html">
  <div>
    <table class="table" id="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Wert</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in Object.keys(filteredObject)">
          <td scope="row">{{ key }}</td>
          <td scope="row">{{ filteredObject[key] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="buttonContainer">
      <button class="btn btn-primary" @click="fullObject =! fullObject">{{ fullObject ? 'Hide' : 'Show' }} full JSON object</button>
    </div>
    <pre v-if="fullObject">
      {{ JSON.stringify(detailObject, null, '\t') }}
    </pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DetailView',
  data() {
    return {
      detailObject: {},
      fullObject: false,
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
        console.log('Stelle', res.data);
        this.detailObject = res.data;
        this.detailObject.autor = []
        const authorUrls = this.detailObject.text.autor;
        for (let i = 0; i < authorUrls.length; i += 1) {
          axios(authorUrls[i])
          .then((res) => {
            console.log('Autor', res.data);
            this.detailObject.autor.push(res.data.name)
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  computed: {
    filteredObject() {
      const retObj = {};
      const obj = this.detailObject;

      if (!Object.keys(obj).length) return retObj;

      retObj.Title = obj.text.title;
      retObj.Quote = obj.zitat;
      retObj.Cited = obj.zitat_stelle;
      retObj.Summary = obj.summary;
      retObj.Autor = obj.autor.join(", ");
      retObj.Edition = obj.text.edition;

      retObj.Written = `${obj.text.start_date ? obj.text.start_date : 'unknown'} - ${(obj.text.end_date ? obj.text.end_date : 'unknown')}`;

      retObj.Translation = obj.Translation

      retObj.Keywords = obj.key_word.map(x => x.stichwort).join(", ")

      retObj.Comment = obj.kommentar;

      return retObj;
    },

  },
  mounted() {
    this.getDetails(this.$route.params.id)
  }
}
</script>

<style lang="css" scoped>
  div {
    text-align: left;
  }
  .buttonContainer {
    text-align: center;
  }
  pre {
    max-width: 100vw;overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
</style>
