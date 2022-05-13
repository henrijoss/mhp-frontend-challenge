<template>
  <button class="btn" :class="buttonClass">
    <i v-if="buttonIconLeftClass" class="icon" :class="buttonIconLeftClass"></i>
    <span>{{ buttonText }}</span>
    <i
      v-if="buttonIconRightClass"
      class="icon"
      :class="buttonIconRightClass"
    ></i>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    buttonText: {
      type: String,
      default: "",
    },
    buttonClass: {
      String,
      default: "",
    },
    buttonIconLeftClass: {
      type: String,
      default: "",
    },
    buttonIconRightClass: {
      type: String,
      default: "",
    },
  },
};
</script>
