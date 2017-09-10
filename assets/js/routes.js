import CategoriesList from "../components/categories/CategoriesList.vue";

export default [
  {
    path: "/",
    component: CategoriesList
  }, {
    path: "*",
    redirect: "/"
  }
];