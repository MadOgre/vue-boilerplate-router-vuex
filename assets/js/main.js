import Vue from "vue";
import VueRouter from "vue-router";
import App from "../components/App.vue";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  el: "#vue-app",
  render: h => h(App),
  router
});