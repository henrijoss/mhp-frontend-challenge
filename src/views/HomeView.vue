<template>
  <div v-if="error.state">{{ error.message }}</div>
  <article v-else class="overview-houses">
    <ListHouseItem :houses="houses" />
    <BasePagination :currentPage="currentPage" @change-page="fetchHouses" />
  </article>
</template>

<script>
// @ is an alias to /src
import { storeGoT } from "@/store/store.js";
import { fetchHousesAPI } from "@/api/apiGoT.js";

import ListHouseItem from "@/components/ListHouseItem.vue";
import BasePagination from "@/components/BasePagination.vue";

export default {
  name: "HomeView",
  components: {
    ListHouseItem,
    BasePagination,
  },
  data() {
    return {
      storeGoT,
      loading: true,
      houses: [],
      currentPage: 1,
      error: {
        state: false,
        message: "",
      },
    };
  },
  async created() {
    await this.fetchHouses(this.currentPage);
  },
  methods: {
    async fetchHouses(page) {
      try {
        this.loading = true;
        this.houses = await fetchHousesAPI(page);
        this.currentPage = page;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error.state = true;
        this.error.message = error.message;
        console.error(error);
      }
    },
  },
};
</script>
