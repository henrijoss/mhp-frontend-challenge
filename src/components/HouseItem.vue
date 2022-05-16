<template>
  <router-link
    :to="{
      name: 'house-detail',
      params: {
        id: house.id,
      },
    }"
    class="house-link"
  >
    <h2>{{ house.name }}</h2>
    <h3>{{ house.region }}</h3>
    <div class="house-hover"><p>Learn more</p></div>
  </router-link>
</template>

<script>
export default {
  name: "HouseItem",
  props: {
    house: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
