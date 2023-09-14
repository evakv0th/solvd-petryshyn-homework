const returnResults = {};

function customHash(string, salt = "salt") {
  if (typeof string !== "string") {
    return new Error("provide string");
  }
  const inputCombined = string + salt;

  let hashResult = 0;

  let checkerForThirdIteration = 0;
  for (let i = 0; i < inputCombined.length; i++) {
    if (checkerForThirdIteration < 2) {
      hashResult += parseInt(
        inputCombined.charCodeAt(i) * inputCombined.length
      );
      checkerForThirdIteration++;
    } else {
      checkerForThirdIteration = 0;
      hashResult += parseInt(
        inputCombined.charCodeAt(i) *
          inputCombined.length *
          inputCombined.length
      );
    }
  }
  const result = hashResult;

  if (
    returnResults.hasOwnProperty(result) &&
    returnResults[result] !== inputCombined
  ) {
    let newSalt = salt + "x";
    return customHash(string, newSalt);
  } else {
    returnResults[result] = inputCombined;
    return result;
  }
}

console.log(customHash("at me 2"));
console.log(customHash("bt le 2"));
console.log(customHash("at me 2", "saltttt"));
console.log(customHash("youAreDoingVeryWellImVeryProudOfYou", "gabe"));

class HashTable {
  constructor() {
    this.table = [];
  }

  
}
