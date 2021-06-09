<template>
  <div id="app">
    <nav-bar />
    <search />
  </div>
</template>

<script>
import NavBar from "./components/NavigationBar";
import Search from "./components/Search";

export default {
  name: "App",
  components: {
    NavBar,
    Search,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
}
nav {
  margin-bottom: 60px;
}
</style>
