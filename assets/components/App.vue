<template>
  <div class="main-wrapper">
    <site-header/>
    <router-view/>
    <site-footer/>
  </div>
</template>

<script>
import SiteHeader from "./common/SiteHeader.vue";
import SiteFooter from "./common/SiteFooter.vue";
export default {
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>
