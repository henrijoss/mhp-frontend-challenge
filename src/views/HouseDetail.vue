<template>
  <div class="container-bg-img bg-map vh-100">
    <router-link :to="{ name: 'home', hash: navigateBack }">
      <BaseButton
        :button-text="'Back'"
        :button-class="'btn-primary'"
        :button-icon-left-class="'icon-light icon-arrow-left'"
      />
    </router-link>

    <div class="container">
      <Transition name="fade" appear>
        <h1 v-if="house.name">
          {{ house.name }}
        </h1>
      </Transition>
      <h2 v-if="house.words" class="subheading tertiary-color">
        {{ house.words }}
      </h2>
      <div v-if="error" class="error">{{ error }}</div>
      <div
        v-for="detail in houseDetails"
        class="house-detail"
        :key="detail.name"
      >
        <div v-if="house[detail.prop]">
          <i class="icon icon-light" :class="'icon-' + detail.icon"></i>
          <h2>
            <strong>{{ detail.name }}</strong>
          </h2>
          <div v-if="Array.isArray(house[detail.prop])">
            <p v-for="(detailItem, index) in house[detail.prop]" :key="index">
              {{ detailItem }}
            </p>
          </div>
          <div v-else>
            <p>{{ house[detail.prop] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onUnmounted } from "vue";
import useHouses from "@/store/useHouses";
import BaseButton from "@/components/BaseButton.vue";
import houseDetails from "@/static/houseDetails.js";

export default {
  name: "HouseDetail",
  components: {
    BaseButton,
  },
  setup() {
    const route = useRoute();
    const { loadHouse, currentHouse, error } = useHouses();
    loadHouse(route.params.id);

    onUnmounted(() => {
      currentHouse.value = {};
    });

    return {
      house: currentHouse,
      error,
      houseDetails,
      navigateBack: route.params.navigateBack,
    };
  },
};
</script>
