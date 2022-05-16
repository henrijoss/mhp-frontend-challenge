const setInLocalStorage = (key, value) => {
  if (typeof value == ("object" || "array")) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
  localStorage.setItem(key + "_timestamp", Date.now());
};

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

const isExpired = (createdAt, expiresIn) => {
  let now = Date.now();
  return now - createdAt > expiresIn;
};

export { setInLocalStorage, getFromLocalStorage };
