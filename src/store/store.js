import { reactive } from "vue";

export const storeGoT = reactive({
  pageAmount: null,
  currentPageSize: null,
  setCurrentPageSize(pageSize) {
    this.currentPageSize = pageSize;
  },
});
