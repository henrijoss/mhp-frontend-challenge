<template>
  <div class="container-bg-img">
    <article class="container houses-container">
      <div v-if="error.state">{{ error.message }}</div>
      <section v-else>
        <h1>
          <hr />
          All Houses
          <hr />
        </h1>
        <ListHouseItem :houses="storeGoT.houses" />
        <BasePagination
          :currentPage="storeGoT.currentPage"
          @change-page="fetchHouses"
          class="houses-pagination"
        />
      </section>
    </article>
  </div>
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
      error: {
        state: false,
        message: "",
      },
    };
  },
  async created() {
    await this.fetchHouses(this.storeGoT.currentPage);
  },
  methods: {
    async fetchHouses(page) {
      try {
        this.loading = true;
        await fetchHousesAPI(page);
        this.storeGoT.currentPage = page;
        this.loading = false;
        console.log(this.storeGoT.houses);
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
