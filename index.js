// I'm presenting you custom hash Table
// first there was function customHash
// and only then i've added HashTable

// class HashTable has object table and methods add (insert), get, remove
//customHash takes string and salt property (which is salt by default) and returns number
// it uses charCodeAt of a letter in a string * length of string+salt
// on every third iteration it also multiplies on length one more time

// collision detection was made by me, when i was doing just function
// it was using external object, but with hashTable class its easier
// if there is key already in hashTable but value is different, than its adding "x" to salt
// this ensures that for same string it will always give same output and for collisions it will take another string

class HashTable {
  constructor() {
    this.table = {};
  }

  customHash(string, salt = "salt") {
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
      this.table.hasOwnProperty(result) &&
      this.table[result] !== inputCombined
    ) {
      let newSalt = salt + "x";
      return this.customHash(string, newSalt);
    } else {
      this.table[result] = inputCombined;
      return result;
    }
  }

  add(key, value) {
    this.table[key] = value;
  }

  get(key) {
    return this.table[key];
  }
  remove(key) {
    delete this.table[key];
  }
}

const hashTable = new HashTable();

console.log(hashTable.customHash("at me 2"));
console.log(hashTable.customHash("bt le 2")); // first 2 cases produces same output without collision handling, you can check it and comment out 'at me 2' and this line will output 28413
console.log(hashTable.customHash("at me 2", "saltttt"));
console.log(
  hashTable.customHash("youAreDoingVeryWellImVeryProudOfYou", "gabe")
);

console.log(hashTable.get(hashTable.customHash("at me 2")));
console.log(hashTable.get(hashTable.customHash("bt le 2")));
console.log(hashTable.get(hashTable.customHash("at me 2", "saltttt")));
console.log(
  hashTable.get(
    hashTable.customHash("youAreDoingVeryWellImVeryProudOfYou", "gabe")
  )
);

hashTable.remove(hashTable.customHash("at me 2"));

console.log(hashTable.table);
