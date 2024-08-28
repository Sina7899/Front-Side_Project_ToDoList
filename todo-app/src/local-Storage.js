function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

const removeToken = () => {
  localStorage.removeItem("JWT");
};

function userInfoAddToLS(firstName, lastName, username) {
  const capitalizeFirstLetter = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  addToLocalStorage("firstName", capitalizeFirstLetter(firstName));
  addToLocalStorage("lastName", capitalizeFirstLetter(lastName));
  addToLocalStorage("username", username);
}

export { addToLocalStorage, getFromLocalStorage, removeToken, userInfoAddToLS };
