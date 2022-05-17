<template>
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
</template>

<script>
export default {
  name: "HouseDetail",
  props: {
    house: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
