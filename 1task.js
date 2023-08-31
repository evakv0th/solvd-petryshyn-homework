function promiseAll(arr) {
  let results = [];
  let promiseNums = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Promise) {
        promiseNums++;
        arr[i]
          .then((values) => {
            results[i] = values;
            promiseNums--;
            if (promiseNums === 0) {
              resolve(results);
            }
          })
          .catch((err) => {
            promiseNums--;
            if (promiseNums === 0) {
              reject(new Error(err));
            }
          });
      } else {
        results[i] = arr[i];
      }
    }
    if (promiseNums === 0) {
      resolve(results);
    }
  });
}

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

const promises = [Promise.resolve(1), promise3, 42];

promiseAll(promises)
  .then((results) => {
    console.log("All promises resolved:", results); // Expected: [1, 2, 3]
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });
