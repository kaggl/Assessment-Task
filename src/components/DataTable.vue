<template>
  <table class="table" id="table">
    <thead>
      <tr>
        <th scope="col">Label</th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Associated Keywords</th>
        <th scope="col">Written</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="res in entries" :key="res.legacy_pk">
        <td scope="row">{{ res.display_label }}</td>
        <td scope="row">
          <router-link :to="`/detail/${res.legacy_pk + 1}`">{{ res.text.title }}</router-link>
        </td>
        <td scope="row">{{ res.autor.join(", ") }}</td>
        <td scope="row">{{ res.key_word.map(x => x.stichwort).join(", ") }}</td>
        <td scope="row">{{ res.text.start_date ? res.text.start_date : 'unknown' }} - {{ res.text.end_date ? res.text.end_date : 'unknown' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    entries: {
      type: Array,
      required: false,
    },
  },
}
</script>

<style lang="css" scoped>
  table {
    margin: auto;
    width: 80vw;
  }
</style>
