import { createApp } from "vue";
import vue3GoogleLogin from "vue3-google-login";
import VueSweetalert2 from "vue-sweetalert2";
import "@sweetalert2/theme-dark/dark.min.css";

import App from "./App.vue";
import "./app.css";

const app = createApp(App);

const options = {
  confirmButtonColor: "#198E84",
  cancelButtonColor: "#d33",
};

app.use(VueSweetalert2, options);

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_CREDENTIAL_ID,
});

app.mount("#app");
