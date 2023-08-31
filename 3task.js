function chainPromises(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input is not an array");
  }

  if (!arr.every((item) => typeof item === "function")) {
    throw new Error("At least one element is not a function");
  }

  let resultPromise = Promise.resolve("");
  for (let i = 0; i < arr.length; i++) {
    resultPromise = resultPromise.then(arr[i]).catch((err) => {
      throw new Error(err);
    });
  }

  return resultPromise;
}

function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

// asyncFunction1().then((res) => {
//   asyncFunction2(res).then((res) => {
//     asyncFunction3(res).then((res) => {
//       console.log(res);
//     });
//   });
// });

chainPromises(functionsArray)
  .then((result) => {
    console.log("Chained promise result:", result);
    // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch((error) => {
    console.error("Chained promise error:", error);
  });
