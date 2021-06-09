<template lang="html">
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
        <td scope="row"><a :href="res.url.replace('?format=json', '')">{{ res.text.title }}</a></td>
        <td scope="row">{{ res.autor.join(", ") }}</td>
        <td scope="row">{{ res.key_word.map(x => x.stichwort).join(", ") }}</td>
        <td scope="row">{{ res.text.start_date }} - {{ res.text.end_date }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['entries'],
}
</script>

<style lang="css" scoped>
  table {
    margin: auto;
    width: 80vw;
  }
</style>
