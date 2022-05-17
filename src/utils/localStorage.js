/**
 * Set data in local storage
 * @public
 *
 * @param {String} key the key it will be saved with
 * @param {String} value the value to save
 */
const setInLocalStorage = (key, value) => {
  if (typeof value == ("object" || "array")) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
  localStorage.setItem(key + "_timestamp", Date.now());
};

/**
 * Get data from local storage
 * @public
 *
 * @param {String} key the key under it was saved
 * @param {Number} expiresIn the amount of time after it expires in ms
 * @returns {(null | String | Object)} the data (parsed or raw) or null if expired
 */
const getFromLocalStorage = (key, expiresIn) => {
  var data = localStorage.getItem(key);
  let createdAt = localStorage.getItem(key + "_timestamp");
  if (data && isExpired(createdAt, expiresIn)) {
    localStorage.removeItem(key);
    localStorage.removeItem(key + "_timestamp");
    return null;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

/**
 * Check if expired
 * @private
 *
 * @param {(String | Number)} createdAt the time the data was created
 * @param {Number} expiresIn the amount of time after it expires in ms
 * @returns {Boolean}
 */
const isExpired = (createdAt, expiresIn) => {
  let now = Date.now();
  return now - createdAt > expiresIn;
};

export { setInLocalStorage, getFromLocalStorage };
