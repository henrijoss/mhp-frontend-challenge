<template>
  <header>
    <Transition name="fade-slow" appear>
      <img src="@/assets/img/logo.png" alt="Logo" />
    </Transition>
    <div class="scrolldown" @click="scrollIntoView('featured-houses')">
      <i class="icon icon-arrow-down"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  methods: {
    scrollIntoView(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
    },
  },
};
</script>
