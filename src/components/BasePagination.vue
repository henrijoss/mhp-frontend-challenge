<template>
  <div>
    <div class="pagination">
      <div class="banner"></div>
      <div class="pagination-buttons">
        <!-- First -->
        <button
          :disabled="isFirstPage"
          @click="$emit('change-page', 1)"
          class="btn btn-pagination"
        >
          <i class="icon icon-light icon-double-arrow-left"></i>
        </button>
        <!-- Prev -->
        <button
          :disabled="isFirstPage"
          @click="$emit('change-page', currentPage - 1)"
          class="btn btn-pagination"
        >
          <i class="icon icon-light icon-arrow-left"></i>
        </button>
        <!-- Next -->
        <button
          :disabled="isLastPage"
          @click="$emit('change-page', currentPage + 1)"
          class="btn btn-pagination"
        >
          <i class="icon icon-light icon-arrow-right"></i>
        </button>
        <!-- Last -->
        <button
          :disabled="isLastPage"
          @click="$emit('change-page', pageAmount)"
          class="btn btn-pagination"
        >
          <i class="icon icon-light icon-double-arrow-right"></i>
        </button>
      </div>

      <div class="banner"></div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";

export default {
  name: "BasePagination",
  emits: ["change-page"],
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pageAmount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isFirstPage = computed(() => {
      return props.currentPage == 1;
    });

    const isLastPage = computed(() => {
      return props.currentPage == props.pageAmount;
    });

    return { isFirstPage, isLastPage };
  },
};
</script>
