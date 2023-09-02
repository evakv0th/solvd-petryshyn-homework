function promiseAll(arr) {
  return new Promise((resolve, reject) => {
    const results = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Promise) {
        arr[i]
          .then((values) => {
            results[i] = values;
            if (results.length === arr.length) {
              resolve(results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        results[i] = arr[i];
      }
    }
  });
}

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

const promises = [
  Promise.resolve(1),
  Promise.resolve("bar"),
  Promise.resolve(2),
  promise3,
];

promiseAll(promises)
  .then((results) => {
    console.log("All promises resolved:", results); // Expected: [1, 'bar', 2, 'foo']
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });
