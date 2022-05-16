const GOT_API_URL = "https://www.anapioficeandfire.com/api";
const DEFAULT_PAGE_SIZE = 9;

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/vnd.anapioficeandfire+json; version=1",
};

/**
 * Fetch array of resources with given page from API
 * @public
 *
 * @param {String} type the resource type
 * @param {Number} page the page to be fetched
 * @returns {Promise<Response>} the returned response
 */
const fetchResourcePage = async (type, page) => {
  let url = `${GOT_API_URL}/${type}?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}`;
  let response = await fetch(url, {
    headers: {
      ...DEFAULT_HEADERS,
    },
  });
  return response;
};

/**
 * Fetch single resource with given index
 * @public
 *
 * @param {String} type the resource type
 * @param {Number} index the index to be fetched
 * @returns {Promise<Response>} the returned response
 */
const fetchResourceIndex = async (type, index) => {
  let response = await fetch(`${GOT_API_URL}/${type}/${index}`, {
    headers: {
      ...DEFAULT_HEADERS,
    },
  });
  return response;
};

export { fetchResourcePage, fetchResourceIndex };
