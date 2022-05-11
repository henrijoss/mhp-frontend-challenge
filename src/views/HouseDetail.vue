<template>
  {{ house.name }}
</template>

<script>
import { storeGoT } from "@/store/store.js";
import { fetchHouseAPI } from "@/api/apiGoT.js";

export default {
  name: "HouseDetail",
  data() {
    return {
      storeGoT,
      house: {},
    };
  },
  async created() {
    // Try to get house from state, if it isnt present fetch it from the api
    let houseItem = this.getHouseFromState();
    this.house = houseItem
      ? houseItem
      : await fetchHouseAPI(this.$route.params.id);
  },
  methods: {
    getHouseFromState() {
      return storeGoT.houses.filter((h) => h.id == this.$route.params.id)[0];
    },
  },
};
</script>
