<template>
  <button @click="$emit('change-page', 1)">First</button>
  <button v-if="currentPage > 1" @click="$emit('change-page', currentPage - 1)">
    Prev
  </button>
  <button
    v-if="currentPage < storeGoT.pageAmount"
    @click="$emit('change-page', currentPage + 1)"
  >
    Next
  </button>
  <button @click="$emit('change-page', storeGoT.pageAmount)">Last</button>
</template>

<script>
import { storeGoT } from "@/store/store.js";

export default {
  name: "BasePagination",
  emits: ["change-page"],
  data() {
    return {
      storeGoT,
    };
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
  },
};
</script>
