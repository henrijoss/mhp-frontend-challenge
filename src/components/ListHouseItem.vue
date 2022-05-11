<template>
  <div v-for="house in houses" :key="house.url" class="list-house">
    <HouseItem :house="house" />
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
