import { storeGoT } from "@/store/store.js";

const GOT_API_URL = "https://www.anapioficeandfire.com/api";
const DEFAULT_PAGE_SIZE = 9;
const MAX_PAGE_SIZE = 50; // defined by the API

const fetchAllHouses = async (pageSize = MAX_PAGE_SIZE) => {
  console.log(pageSize);
};

/**
 * Fetch houses with given page and pageSize
 * @public
 *
 * @param {Number} page – the page to be fetched
 * @param {Number} pageSize – amount of items on one page
 */
const fetchHousesAPI = async (page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  let response = await fetch(
    `${GOT_API_URL}/houses?page=${page}&pageSize=${pageSize}`
  );
  setPageAmountOnPageSizeChange(response.headers, pageSize);
  let houses = await response.json();
  storeGoT.updateHouses(houses);
};

/**
 * Check if pageSize is set or changed and set pageAmount accordingly
 * @private
 *
 * @param {Headers} headers – http headers from api response
 * @param {Number} pageSize – amount of items on one page
 */
const setPageAmountOnPageSizeChange = (headers, pageSize) => {
  if (!storeGoT.currentPageSize || storeGoT.currentPageSize != pageSize) {
    storeGoT.pageAmount = Number(parsePageAmount(headers));
    storeGoT.currentPageSize = pageSize;
  }
};

/**
 * Parse amount of pages from link with rel="last" in headers
 * @private
 *
 * @param {Headers} headers – http headers from api response
 */
const parsePageAmount = (headers) => {
  return headers
    .get("link")
    .split(",")
    .filter((l) => l.includes('rel="last"'))[0]
    .match(/page=(\d*)/)[1];
};

const fetchHouseAPI = async (id) => {
  console.log("test");
  let response = await fetch(`${GOT_API_URL}/houses/${id}`);
  return await response.json();
};

export { fetchAllHouses, fetchHousesAPI, fetchHouseAPI };
