<template>
  <div class="house">
    {{ house.name }}
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
