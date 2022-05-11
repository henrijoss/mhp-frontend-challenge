<template>
  <div
    @click="
      $router.push({
        name: 'HouseDetail',
        params: {
          id: house.id,
        },
      })
    "
    class="house-link"
  >
    <h2>{{ house.name }}</h2>
    <h3>{{ house.region }}</h3>
  </div>
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
