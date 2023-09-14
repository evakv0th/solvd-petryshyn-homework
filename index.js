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

  add(key, value) {
    let hash = customHash(key);

        if (this.table[hash] === undefined) {
            return this.table[hash] = [key, value];
        } else {
            while (this.table[hash] !== undefined) {
                hash++;
            }
        }

        return this.table[hash] = [key, value];
  }

  get(key) {
    let hash = customHash(key);

    while (this.table[hash] !== undefined) {
        if (this.table[hash][0] === key) {
            return this.table[hash][1];
        }
        hash++;
    }

    return undefined;
  }
  remove(key) {
    let hash = customHash(key);

    while (this.table[hash] !== undefined) {
      if (this.table[hash].key === key) {
        delete this.table[hash];
        return;
      }
      hash++;
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
hashTable.add("at me 2", "value");
hashTable.add("bt le 2", "value2");
hashTable.add("bt md 2", "value3");
hashTable.add("youAreDoingVeryWellImVeryProudOfYou", "value4");

console.log(hashTable.get("at me 2"));
console.log(hashTable.get("bt le 2"));
console.log(hashTable.get("bt md 2"));
console.log(hashTable.get("youAreDoingVeryWellImVeryProudOfYou"));

hashTable.remove("at me 2");

for (let [key, value] of Object.entries(hashTable.table)) {
  console.log(`Key: ${key}, Value: ${value}`);
}
