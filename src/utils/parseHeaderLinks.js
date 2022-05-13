/**
 * Parse link field in headers
 * @public
 *
 * @param {Headers} headers http headers
 * @returns {Object} parsed headers
 */
const parseHeaderLinks = (headers) => {
  let parsedHeader = {};
  headers
    .get("link")
    .split(",")
    .forEach((l) => {
      parsedHeader[l.match(/rel="(.*?)"/)[1]] = {
        url: l,
        page: Number(l.match(/page=(\d*)/)[1]),
        pageSize: Number(l.match(/pageSize=(\d*)/)[1]),
      };
    });
  return parsedHeader;
};

export default parseHeaderLinks;
