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

function measureSortTime(sortFunction, array) {
  let t0 = performance.now();
  sortFunction(array);
  let t1 = performance.now();
  return Math.round((t1 - t0) * 10000) / 10000;
}

function runSortingTests(array, arrayType) {
  const result = {
    "Array Length": array.length,
    "Array Type": arrayType,
  };

  const sortingAlgorithms = [
    { name: "QuickSort", func: quickSort },
    { name: "MergeSort", func: mergeSort },
    { name: "BubbleSort", func: bubbleSort },
  ];

  for (const algorithm of sortingAlgorithms) {
    const time = measureSortTime(algorithm.func, [...array]);
    result[algorithm.name] = `${time} ms`;
  }

  return result;
}

const arrayLengths = [2, 10, 50, 100, 500, 1000, 5000, 10000];
const arrayTypes = ["RANDOM", "SORTED", "SORTED-BACKWARDS"];

const allResultsRandom = [];
const allResultsSorted = [];
const allResultsSortedBack = [];

for (const length of arrayLengths) {
  let array;

  array = shuffleArray(Array.from({ length }, (_, index) => index + 1));
  allResultsRandom.push(runSortingTests(array, arrayTypes[0]));
}

for (const length of arrayLengths) {
  let array;

  array = Array.from({ length }, (_, index) => index + 1);
  allResultsSorted.push(runSortingTests(array, arrayTypes[1]));
}

for (const length of arrayLengths) {
  let array;

  array = Array.from({ length }, (_, index) => length - index);
  allResultsSortedBack.push(runSortingTests(array, arrayTypes[2]));
}

console.table(allResultsRandom);
console.table(allResultsSorted);
console.table(allResultsSortedBack);

const conclusion = `Conclusion: In my usage of sorting bubble sort was the worst starting from range 100-500 elements.

Why mergeS and quickS are better in bigger datasets: 
1) They both have O(nlogn) while bubbleS has O(n^2)
2) bubbleS doesnt benefit from partially sort list, while quick and merge both have this "adaptivity".`;

console.log(conclusion);
