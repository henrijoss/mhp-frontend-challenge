import { reactive } from "vue";

export const storeGoT = reactive({
  houses: [],
  updateHouses(houses) {
    houses = houses.map((h) => {
      h.id = h.url.match(/\d+/)[0];
      return h;
    });
    this.houses = houses;
  },
  pageAmount: null,
  currentPage: 1,
  currentPageSize: null,
  setCurrentPageSize(pageSize) {
    this.currentPageSize = pageSize;
  },
});
