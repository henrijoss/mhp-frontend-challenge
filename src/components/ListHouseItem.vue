<template>
  <div class="houses-list">
    <div v-for="house in houses" :key="house.url" class="house">
      <HouseItem :house="house" />
    </div>
  </div>
</template>

<script>
import HouseItem from "@/components/HouseItem.vue";

export default {
  name: "ListHouseItem",
  components: {
    HouseItem,
  },
  props: {
    houses: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
