import { ref } from "vue";
import { fetchResourcePage, fetchResourceIndex } from "@/api/apiGoT";
import parseHeaderLinks from "@/utils/parseHeaderLinks";

const houses = ref([]);
const currentHouse = ref({});
const currentPage = ref(1);
const pageAmount = ref(0);
const loading = ref(false);
const error = ref(null);

const useHouses = () => {
  const setHouses = async (pageIndex, response) => {
    // initial set of page amount if not present
    if (!pageAmount.value) {
      pageAmount.value = parseHeaderLinks(response.headers).last.page;
    }

    let resourceData = await response.json();

    // update currentPage
    currentPage.value = pageIndex;

    // add id to every house and save in store
    resourceData.forEach((r) => {
      r.id = r.url.match(/\d+/)[0];
    });

    houses.value[pageIndex - 1] = resourceData;
  };

  const loadHouses = async (pageIndex = currentPage.value) => {
    console.log(houses.value);
    if (!houses.value[pageIndex - 1]) {
      try {
        loading.value = true;
        let response = await fetchResourcePage("houses", pageIndex);
        await setHouses(pageIndex, response);
        loading.value = false;
        if (!response.ok) {
          throw new Error("Service unavailable");
        }
      } catch (e) {
        loading.value = false;
        error.value = e.message;
      }
    } else {
      // update currentPage
      console.log("bereits da");
      currentPage.value = pageIndex;
    }
  };

  const getHouses = (pageIndex = currentPage.value) => {
    return houses.value[pageIndex - 1];
  };

  const getHouse = (houseId) => {
    return houses.value.forEach((h) => h.find((house) => house.id == houseId));
  };

  const loadHouse = async (houseId) => {
    if (!getHouse(houseId)) {
      try {
        loading.value = true;
        let response = await fetchResourceIndex("houses", houseId);
        currentHouse.value = await response.json();
        if (!response.ok) {
          throw new Error("Service unavailable");
        }
        loading.value = false;
      } catch (e) {
        loading.value = false;
        error.value = e.message;
      }
    }
  };

  return {
    loading,
    error,
    currentPage,
    pageAmount,
    currentHouse,
    getHouses,
    getHouse,
    loadHouses,
    loadHouse,
  };
};

export default useHouses;
