import { ref } from "vue";
import { fetchResourcePage, fetchResourceIndex } from "@/api/apiGoT";
import parseHeaderLinks from "@/utils/parseHeaderLinks";
import { setInLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

const houses = ref([]);
const currentHouse = ref({});
const currentPage = ref(1);
const pageAmount = ref(Number(localStorage.getItem("pageAmount")) || 0);
const loading = ref(false);
const error = ref(null);

const ONE_DAY = 24 * 60 * 60 * 1000;
const EXPIRES_IN = ONE_DAY * 7;

const useHouses = () => {
  const loadHouses = async (pageIndex = currentPage.value) => {
    if (
      (!getHouses(pageIndex) && !getFromLocalStorage(pageIndex, EXPIRES_IN)) ||
      !pageAmount.value
    ) {
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
    data.forEach((house) => {
      house.id = house.url.match(/\d+/)[0];
    });
    houses.value[pageIndex - 1] = data;
    setInLocalStorage(pageIndex, data);
  };

  const setPageAmount = (headers) => {
    if (!pageAmount.value) {
      let amount = parseHeaderLinks(headers).last.page;
      pageAmount.value = amount;
      setInLocalStorage("pageAmount", amount);
    }
  };

  const getHouses = (pageIndex = currentPage.value) => {
    if (!houses.value[pageIndex - 1]) {
      houses.value[pageIndex - 1] = getFromLocalStorage(pageIndex, EXPIRES_IN);
    }
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
