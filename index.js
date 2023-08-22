import bubbleSort from "./bubbleSort.js";
import mergeSort from "./mergeSort.js";
import quickSort from "./quickSort.js";

function shuffleArray(array) {
  let newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

let lengthOfArray = 75;
let arrSorted = [];
for (let i = 1; i <= lengthOfArray; i++) {
  arrSorted.push(i);
}
let arrSortedBackwards = [...arrSorted].reverse();
let arrRandom = shuffleArray(arrSorted);

let results = "";

let t0 = performance.now();
quickSort(arrRandom);
let t1 = performance.now();
results += `quickSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - RANDOM\n`;

t0 = performance.now();
quickSort(arrSorted);
t1 = performance.now();
results += `quickSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - SORTED\n`;

t0 = performance.now();
quickSort(arrSortedBackwards);
t1 = performance.now();
results += `quickSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - SORTED-BACKWARDS\n`;

t0 = performance.now();
mergeSort(arrRandom);
t1 = performance.now();
results += `mergeSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - RANDOM\n`;

t0 = performance.now();
mergeSort(arrSorted);
t1 = performance.now();
results += `mergeSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - SORTED\n`;

t0 = performance.now();
mergeSort(arrSortedBackwards);
t1 = performance.now();
results += `mergeSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - SORTED-BACKWARDS\n`;


t0 = performance.now();
bubbleSort(arrRandom);
t1 = performance.now();
results += `bubbleSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - RANDOM\n`;

t0 = performance.now();
bubbleSort(arrSorted);
t1 = performance.now();
results += `bubbleSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - SORTED\n`;

t0 = performance.now();
bubbleSort(arrSortedBackwards);
t1 = performance.now();
results += `bubbleSort of ${lengthOfArray} elements ${
  Math.round((t1 - t0) * 10000) / 10000
} - SORTED-BACKWARDS\n`;

console.log(results);
