<template>
  <div :style="{ height, width }" :class="cssClass" class="skeleton"></div>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: {
    cssClass: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: null,
    },
  },
};
</script>
