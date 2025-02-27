import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).use(vuetify).mount("#app");
