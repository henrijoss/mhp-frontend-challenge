<template>
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
