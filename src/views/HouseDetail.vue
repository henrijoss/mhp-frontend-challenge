<template>
  <div class="container-bg-img bg-map">
    <router-link :to="{ name: 'home' }">
      <BaseButton
        :button-text="'Back'"
        :button-class="'btn-primary'"
        :button-icon-left-class="'icon-light icon-arrow-left'"
      />
    </router-link>

    <div class="container vh-100">
      <h1>
        <hr />
        {{ house.name }}
        <hr />
      </h1>
      <div class="house-region">
        <i v-if="house.region" class="icon icon-light icon-explore"></i>
        <h2>{{ house.region }}</h2>
      </div>
      <div v-if="house.coatOfArms" class="house-coat-of-arms">
        <i class="icon icon-light icon-large icon-coat-of-arms"></i>
        <h3>{{ house.coatOfArms }}</h3>
      </div>
      <h2>{{ house.founded }}</h2>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import useHouses from "@/store/useHouses";

import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "HouseDetail",
  components: {
    BaseButton,
  },
  setup() {
    const route = useRoute();
    const { loadHouse, currentHouse } = useHouses();
    loadHouse(route.params.id);
    return { house: currentHouse };
  },
};
</script>
