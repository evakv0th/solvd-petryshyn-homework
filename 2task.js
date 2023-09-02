function promiseAllSettled(arr) {
  return new Promise((resolve, reject) => {
    const results = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Promise) {
        arr[i]
          .then((values) => {
            results[i] = { status: "fulfilled", value: values };
            if (arr.length === results.length) {
              resolve(results);
            }
          })
          .catch((reason) => {
            results[i] = { status: "rejected", reason: reason };
            if (arr.length === results.length) {
              resolve(results);
            }
          });
      } else {
        results[i] = { status: "fulfilled", value: arr[i] };
      }
    }
  });
}

const promises = [
  Promise.resolve(1),
  Promise.reject(3),
  42,
  Promise.resolve(3),
];

promiseAllSettled(promises).then((results) => {
  console.log("All promises settled:", results);

  for (let result of results) {
    console.log("All promises settled:", result);
  }
  // All promises settled: (4) [{…}, {…}, {…}, {…}]
  // All promises settled: {status: 'fulfilled', value: 1}
  // All promises settled: {status: 'rejected', reason: 3}
  // All promises settled: {status: 'fulfilled', value: 42}
  // All promises settled: {status: 'fulfilled', value: 3}
});
