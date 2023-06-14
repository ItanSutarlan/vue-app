import { createApp, markRaw } from "vue";
import vue3GoogleLogin from "vue3-google-login";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./app.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.use(pinia);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_CREDENTIAL_ID,
});
app.use(VueSweetalert2);

app.mount("#app");
