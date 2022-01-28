export const setData = (key, val) => {
  localStorage.setItem(key, val)
};

const getData = (key) => localStorage.getItem(key);

const deleteData = (key) => {
  localStorage.removeItem(key);
}

export const storageHelper = {
  setData,
  getData,
  deleteData,
};
