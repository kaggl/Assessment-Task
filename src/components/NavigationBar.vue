<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <!-- Your site title as branding in the menu -->
      <router-link to="/search/" class="navbar-brand custom-logo-link" rel="home"><img src="../assets/fundament_logo.svg" class="img-fluid" alt="Your Logo" itemprop="logo"></router-link>
      <router-link to="/search/" class="navbar-brand site-title-with-logo" rel="home" title="Assessment Task">Assessment Task</router-link>
      <div class="dropdown">
        <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ $t('lang') }}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" @click.prevent="$i18n.locale = 'en'">English</a>
          <a class="dropdown-item" href="#" @click.prevent="$i18n.locale = 'de'">Deutsch</a>
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
  watch: {
    $i18n: {
     handler(val){
       console.log(val.locale);
     },
     deep: true
  }
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
