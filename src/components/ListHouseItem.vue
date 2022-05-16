<template>
  <div v-if="loading" class="houses-list">
    <SkeletonLoader v-for="index in 9" :key="index" :css-class="'house'" />
  </div>
  <div v-else class="houses-list">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-for="house in houses" :key="house.url" class="house">
      <HouseItem :house="house" />
    </div>
  </div>
</template>

<script>
import HouseItem from "@/components/HouseItem.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

export default {
  name: "ListHouseItem",
  components: {
    HouseItem,
    SkeletonLoader,
  },
  props: {
    houses: {
      type: Array,
      default: () => [],
    },
    error: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
