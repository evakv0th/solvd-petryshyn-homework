function curry(func, arity) {
  if (typeof func !== "function" || typeof arity !== "number" || arity <= 0) {
    throw new Error("please provide function and positive number");
  }
  return function curried(...args) {
    if (args.length >= arity) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        const argsWithoutPlaceholders = args.map((arg) =>
          arg === '_' && args2.length ? args2.shift() : arg
        );
        return curried.apply(this, argsWithoutPlaceholders.concat(args2));
      };
    }
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

 


const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function  
const step2 = step1(3); // Returns a curried function  
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24  
  
console.log("Result:", result); // Expected: 24

// console.log("pending curried func waiting for arguments:", result);

// const resultN = result('_')(5);
// console.log("pending curried func waiting for arguments:", resultN);
// const resultN1 = resultN(4)
// console.log("Result:", resultN1);

function add(...args) {
  let sum = 0;
  args.map((num) => (sum += num));
  return sum;
}

const curriedSum = curry(add, 5);

const sumRes = curriedSum(5,'_','_')('_')('_');
console.log("pending curried func waiting for arguments:", sumRes);


const sumRes2 = sumRes(999)(66)(20)(110);
console.log("Result", sumRes2);
