function debounce(func, duration) {
  if (
    typeof func !== "function" ||
    typeof duration !== "number" ||
    duration < 0
  ) {
    throw new Error("please provide function and positive number");
  }
  let timeout;
  return function (...args) {
    const effect = () => {
      timeout = null;
      return func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(effect, duration);
  };
}

function debouncedSearch(query) {
  if (query) {
    console.log("Searching for:", query);
  }
}
const debouncedSearchHandler = debounce(debouncedSearch, 500);

const inputElement = document.getElementById("search-input");

inputElement.addEventListener("input", (event) => {
  debouncedSearchHandler(event.target.value);
});
