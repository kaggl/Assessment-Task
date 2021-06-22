import { createApp } from "vue";
import App from "./App.vue";
import router from './plugins/router.js';
import i18n from './plugins/i18n.js';

createApp(App)
  .use(i18n)
  .use(router)
  .mount("#app");
