<template>
  <div class="overlay-effects">
    <div v-for="index in 200" :key="index" class="snow"></div>
    <div id="foglayer_01" class="fog">
      <div class="image01"></div>
      <div class="image02"></div>
    </div>
    <div id="foglayer_02" class="fog">
      <div class="image01"></div>
      <div class="image02"></div>
    </div>
    <div id="foglayer_03" class="fog">
      <div class="image01"></div>
      <div class="image02"></div>
    </div>
  </div>
  <TheHeader v-if="!['house-detail'].includes($route.name)" />
  <main><router-view /></main>
  <TheFooter />
</template>

<script>
import TheHeader from "@/layouts/TheHeader.vue";
import TheFooter from "@/layouts/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
