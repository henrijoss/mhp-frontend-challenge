<template>
  <FeaturedHouses :houses="featuredHouses" />
  <div class="container-bg-img bg-throne">
    <article class="container houses-container" id="all-houses">
      <section>
        <Transition name="fade" appear>
          <h1>All Houses</h1>
        </Transition>

        <ListHouseItem
          :houses="getHouses(currentPage)"
          :error="error"
          :loading="loading"
        />

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
import FeaturedHouses from "@/components/FeaturedHouses.vue";
import featuredHouses from "@/static/featuredHouses";

export default {
  name: "HomeView",
  components: {
    ListHouseItem,
    BasePagination,
    FeaturedHouses,
  },
  setup() {
    const { loading, error, currentPage, pageAmount, loadHouses, getHouses } =
      useHouses();
    loadHouses();
    return {
      loading,
      error,
      currentPage,
      pageAmount,
      featuredHouses,
      loadHouses,
      getHouses,
    };
  },
};
</script>
