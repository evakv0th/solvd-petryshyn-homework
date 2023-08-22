function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return [...arr, ...left, ...right];
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let newArr = [...arr];
  const half = newArr.length / 2;

  const left = newArr.splice(0, half);
  const right = newArr;
  return merge(mergeSort(left), mergeSort(right));
}

export default mergeSort;