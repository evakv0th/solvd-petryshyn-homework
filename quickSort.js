function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let newArr = [...arr];
  const pivot = newArr[Math.floor(Math.random() * newArr.length)];

  let left = [];
  let right = [];
  let equal = [];

  for (let val of newArr) {
    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      equal.push(val);
    }
  }
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

export default quickSort;
