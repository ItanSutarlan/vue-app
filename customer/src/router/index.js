import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import Sidebar from "../components/Sidebar.vue";
import HomePage from "../views/HomePage.vue";
import DetailPage from "../views/DetailPage.vue";
import WishlistPage from "../views/WishlistPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/",
      component: Sidebar,
      children: [
        {
          path: "",
          name: "Home",
          component: HomePage,
        },
        {
          path: ":productId(\\d+)",
          name: "Detail",
          component: DetailPage,
        },
        {
          path: "wishlist",
          name: "Wishlist",
          component: WishlistPage,
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "Wishlist" && !localStorage.getItem("access_token"))
    next({ name: "Login" });
  else if (
    (to.name === "Login" || to.name === "Register") &&
    localStorage.getItem("access_token")
  )
    next({ name: "Home" });
  else next();
});

export default router;
