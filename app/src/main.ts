import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import { createPinia } from "pinia";
import { router } from "./plugins/router/router";

const pinia = createPinia();

export const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .mount("#app");
