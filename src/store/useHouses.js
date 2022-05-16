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
  const loadHouses = async (pageIndex = currentPage.value) => {
    if (!getHouses(pageIndex)) {
      try {
        loading.value = true;
        let response = await fetchResourcePage("houses", pageIndex);
        let houses = await response.json();
        setPageAmount(response.headers);
        setHouses(pageIndex, houses);
        if (!response.ok) {
          throw new Error("Failed to load houses data");
        }
      } catch (e) {
        error.value = e.message;
      } finally {
        loading.value = false;
      }
    }
    currentPage.value = pageIndex;
  };

  const setHouses = async (pageIndex, data) => {
    // parse id and set as property
    data.forEach((r) => {
      r.id = r.url.match(/\d+/)[0];
    });
    houses.value[pageIndex - 1] = data;
  };

  const setPageAmount = (headers) => {
    if (!pageAmount.value) {
      pageAmount.value = parseHeaderLinks(headers).last.page;
    }
  };

  const getHouses = (pageIndex = currentPage.value) => {
    return houses.value[pageIndex - 1];
  };

  const loadHouse = async (houseId) => {
    try {
      loading.value = true;
      let response = await fetchResourceIndex("houses", houseId);
      currentHouse.value = await response.json();
      if (!response.ok) {
        throw new Error("Failed to load house data");
      }
    } catch (e) {
      error.value = e.message;
      console.error(e.message);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    currentPage,
    pageAmount,
    currentHouse,
    getHouses,
    loadHouses,
    loadHouse,
  };
};

export default useHouses;
