<template>
  <div class="container-bg-img bg-map vh-100">
    <router-link :to="{ name: 'home', hash: $route.params.navigateBack }">
      <BaseButton
        :button-text="'Back'"
        :button-class="'btn-primary'"
        :button-icon-left-class="'icon-light icon-arrow-left'"
      />
    </router-link>
    <div v-if="loading" class="house-detail-skeleton">
      <SkeletonLoader
        :cssClass="'skeleton-header'"
        :width="'60%'"
        :height="'4rem'"
      />
      <div v-for="index in 4" :key="index">
        <SkeletonLoader :width="'12rem'" :height="'2rem'" />
        <SkeletonLoader :width="'5rem'" :height="'2rem'" />
        <SkeletonLoader :width="'18rem'" :height="'2rem'" />
      </div>
    </div>
    <div v-else class="container">
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
        <HouseDetail :house="house" :detail="detail" />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onUnmounted } from "vue";
import useHouses from "@/store/useHouses";
import BaseButton from "@/components/BaseButton.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import HouseDetail from "@/components/HouseDetail.vue";
import houseDetails from "@/static/houseDetails.js";

export default {
  name: "HouseDetailView",
  components: {
    BaseButton,
    SkeletonLoader,
    HouseDetail,
  },
  setup() {
    const route = useRoute();
    const { fetchHouse, currentHouse, error, loading } = useHouses();

    if (!currentHouse.value.name) {
      fetchHouse(route.params.id);
    }

    onUnmounted(() => {
      currentHouse.value = {};
    });

    return {
      house: currentHouse,
      error,
      houseDetails,
      navigateBack: route.params.navigateBack,
      loading,
    };
  },
};
</script>
