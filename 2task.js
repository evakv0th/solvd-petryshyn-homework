function promiseAllSettled(arr) {
  let results = [];
  let promiseNums = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Promise) {
        promiseNums++;
        arr[i]
          .then((values) => {
            results[i] = { status: "fulfilled", value: values };
            promiseNums--;
            if (promiseNums === 0) {
              resolve(results);
            }
          })
          .catch((reason) => {
            promiseNums--;
            results[i] = { status: "rejected", reason: reason };
            if (promiseNums === 0) {
              resolve(results);
            }
          });
      } else {
        results[i] = { status: "fulfilled", value: arr[i] };
      }
    }
    if (promiseNums === 0) {
      resolve(results);
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
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
});
