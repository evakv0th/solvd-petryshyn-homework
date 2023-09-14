// I'm presenting you custom hash Table
// first there was function customHash
// and only then i've added HashTable

// class HashTable has object table and methods add (insert), get, remove
//customHash takes string and salt property (which is salt by default) and returns number
// it uses charCodeAt of a letter in a string * length of string+salt
// on every third iteration it also multiplies on length one more time

// collision handling using separate chaining
// it stores in buckets, and for strings that has same hash (in my func - 'at me 2' and 'bt le 2' are the same number 28413)
// it stores as key-value, where key=hash, and value=assigned value when we use add method
// when we use get method - it gets value that was asked, even if hash is the same for some string (collision)
class HashTable {
  constructor() {
    this.table = {};
  }

  add(key, value) {
    const hash = customHash(key);

    if (this.table[hash] === undefined) {
      this.table[hash] = [];
    }
    const chain = this.table[hash];
    for (let i = 0; i < chain.length; i++) {
      if (chain[i][0] === key) {
        chain[i][1] = value;
        return;
      }
    }

    chain.push([key, value]);
  }

  get(key) {
    const hash = customHash(key);

    if (this.table[hash] === undefined) {
      return undefined;
    }

    const chain = this.table[hash];
    for (let i = 0; i < chain.length; i++) {
      if (chain[i][0] === key) {
        return chain[i][1];
      }
    }

    return undefined;
  }

  remove(key) {
    const hash = customHash(key);

    if (this.table[hash] === undefined) {
      return;
    }

    const chain = this.table[hash];
    for (let i = 0; i < chain.length; i++) {
      if (chain[i][0] === key) {
        chain.splice(i, 1);
        return;
      }
    }
  }
}

const hashTable = new HashTable();

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

  return hashResult;
}

hashTable.add("at me 2", "value1");
hashTable.add("bt le 2", "value2");
hashTable.add("bt md 2", "value3");
hashTable.add("youAreDoingVeryWellImVeryProudOfYou", "value4");

console.log(hashTable.get("bt md 2"));
console.log(hashTable.get("at me 2"));
console.log(hashTable.get("bt le 2"));
console.log(hashTable.get("bt md 2"));
console.log(hashTable.get("youAreDoingVeryWellImVeryProudOfYou"));

hashTable.remove("at me 2");

console.log(hashTable.get("at me 2"));

hashTable.add("at me 2", "test");
console.log(hashTable.get("at me 2"));

for (let [key, value] of Object.entries(hashTable.table)) {
  console.log(`Key: ${key}, Values: ${value}`);
}
