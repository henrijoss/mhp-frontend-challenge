<template>
  <div class="houses-featured-container" id="featured-houses">
    <Transition name="fade" appear>
      <h1 class="banner-heading">Featured Houses</h1>
    </Transition>
    <article class="houses-featured">
      <router-link
        :to="{
          name: 'house-detail',
          params: {
            id: house.id,
            navigateBack: '#featured-houses',
          },
        }"
        v-for="house in houses"
        :key="house.id"
        :style="{ backgroundColor: house.color }"
        class="house-featured"
      >
        <img :src="house.imgUrl" alt="house-logo" lazy />
        <h2>{{ house.shortName }}</h2>
      </router-link>
    </article>
  </div>
</template>

<script>
export default {
  name: "FeaturedHouses",
  props: {
    houses: {
      type: Array,
      required: true,
    },
  },
};
</script>
