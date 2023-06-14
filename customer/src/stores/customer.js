import { defineStore } from "pinia";
import axios from "axios";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    email: localStorage.getItem("email") || "",
    isLoggedin: localStorage.getItem("access_token") ? true : false,
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  actions: {
    async handleRegister({ email, password }) {
      const { data: response } = await axios.post(`${this.baseUrl}/register`, {
        email,
        password,
      });
      return response;
    },
    async handleLogin({ email, password }) {
      const { data: response } = await axios.post(`${this.baseUrl}/login`, {
        email,
        password,
      });
      const access_token = response.data.access_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("email", email);
      this.isLoggedin = true;
      this.email = email;
      return response;
    },
    async handleGoogleLogin(obj) {
      const { data: response } = await axios.post(
        `${this.baseUrl}//login-google-credential`,
        { credential: obj.credential }
      );
      const access_token = response.data.access_token;
      const email = response.data.email;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("email", email);
      this.isLoggedin = true;
      this.email = email;
      return response;
    },
    handleLogout() {
      localStorage.clear();
      this.isLoggedin = false;
      this.email = "";
    },
  },
});
