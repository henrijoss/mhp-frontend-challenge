import { ref } from "vue";
import {
  fetchResourcePage,
  fetchResourceIndex,
  fetchResourceHeaders,
} from "@/api/apiGoT";
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
      await fetchHouses(pageIndex);
    }
    if (!pageAmount.value) {
      await fetchPageAmount();
    }
    currentPage.value = pageIndex;
  };

  const fetchHouses = async (pageIndex) => {
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
  };

  const fetchPageAmount = async () => {
    try {
      let response = await fetchResourceHeaders("houses");
      setPageAmount(response.headers);
    } catch (e) {
      error.value = e.message;
    }
  };

  const setHouses = async (pageIndex, data) => {
    data.forEach((house) => {
      house.id = house.url.match(/\d+/)[0];
    });
    houses.value[pageIndex - 1] = data;
  };

  const setPageAmount = (headers) => {
    let amount = parseHeaderLinks(headers).last.page;
    pageAmount.value = amount;
  };

  const getHouses = (pageIndex = currentPage.value) => {
    return houses.value[pageIndex - 1];
  };

  const fetchHouse = async (houseId) => {
    try {
      loading.value = true;
      let response = await fetchResourceIndex("houses", houseId);
      currentHouse.value = await response.json();
      if (!response.ok) {
        throw new Error("Failed to load house data");
      }
    } catch (e) {
      error.value = e.message;
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
    fetchHouse,
    loadHouses,
  };
};

export default useHouses;
