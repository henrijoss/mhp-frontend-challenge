<template>
  <div class="container-bg-img bg-throne">
    <article class="container houses-container">
      <div v-if="error">{{ error.message }}</div>
      <section>
        <h1>
          <hr />
          All Houses
          <hr />
        </h1>
        <div v-if="loading" class="houses-list">
          <SkeletonLoader
            v-for="index in 9"
            :key="index"
            :css-class="'house'"
          />
        </div>
        <ListHouseItem v-else :houses="getHouses(currentPage)" />
        <BasePagination
          :current-page="currentPage"
          :page-amount="pageAmount"
          @change-page="loadHouses"
          class="houses-pagination"
        />
      </section>
    </article>
  </div>
</template>

<script>
import useHouses from "@/store/useHouses";

import ListHouseItem from "@/components/ListHouseItem.vue";
import BasePagination from "@/components/BasePagination.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

export default {
  name: "HomeView",
  components: {
    ListHouseItem,
    BasePagination,
    SkeletonLoader,
  },
  setup() {
    const { loading, error, currentPage, pageAmount, loadHouses, getHouses } =
      useHouses();
    console.log(loading.value);
    loadHouses();
    return {
      loading,
      error,
      currentPage,
      pageAmount,
      loadHouses,
      getHouses,
    };
  },
};
</script>
