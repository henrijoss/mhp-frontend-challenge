<template>
  <div>
    <button @click="$emit('change-page', 1)" class="btn btn-pagination">
      <i class="icon icon-light icon-double-arrow-left"></i>
    </button>
    <button
      :disabled="currentPage == 1"
      @click="$emit('change-page', currentPage - 1)"
      class="btn btn-pagination"
    >
      <i class="icon icon-light icon-arrow-left"></i>
    </button>
    <button
      :disabled="currentPage == storeGoT.pageAmount"
      @click="$emit('change-page', currentPage + 1)"
      class="btn btn-pagination"
    >
      <i class="icon icon-light icon-arrow-right"></i>
    </button>
    <button
      @click="$emit('change-page', storeGoT.pageAmount)"
      class="btn btn-pagination"
    >
      <i class="icon icon-light icon-double-arrow-right"></i>
    </button>
  </div>
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
