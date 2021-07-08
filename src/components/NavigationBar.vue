<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container" @click="logStore">
      <!-- Your site title as branding in the menu -->
      <router-link to="/" class="navbar-brand custom-logo-link" rel="home"><img src="../assets/fundament_logo.svg" class="img-fluid" alt="Your Logo" itemprop="logo"></router-link>
      <router-link to="/" class="navbar-brand site-title-with-logo" rel="home" title="Assessment Task">Assessment Task</router-link>
      <div class="dropdown">
        <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ $t('lang') }}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <router-link class="dropdown-item" to="/en/search/stelle">English</router-link>
          <router-link class="dropdown-item" to="/de/search/stelle">Deutsch</router-link>
        </div>
      </div>
      <a href="https://github.com/kaggl/Assessment-Task">
        <button class="form-inline btn btn-outline-info">
          Repository
        </button>
      </a>
    </div><!-- .container -->
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      langMap: {
        en: 'English',
        de: 'Deutsch',
      },
    };
  },
  methods: {
    logStore() {
      console.log(this.$store.state.lang, this.$store.state.results, this.$store);
    }
  },
  watch: {
    $i18n: {
      handler(val) {
        console.log('Language changed to:', val.locale);
      },
      deep: true
    },
    $route(to) {
      this.$i18n.locale = to.params.locale;
    },
  }
}
</script>
<style scoped>
  .dropdown {
    margin-right: 10px;
  }
</style>
<i18n>
{
  "en": {
    "lang": "English",
  },
  "de": {
    "lang": "Deutsch",
  }
}
</i18n>
