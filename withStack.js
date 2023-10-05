function myJSONParse(string) {
  validateJSON(string); // i've made another function for validation of input, its below parser

  const tokenizationRE =
    /("[^"]+"(?=\s*:))|("[^"]*")|(\d+(\.\d+)?)|(\btrue\b|\bfalse\b)|(null)|({)|(\[)|(})|(\])/g; // my regExp for keys, values, '{', '}', '[', ']'
  const stack = []; // to remove recursion i've used stack
  const keysStack = []; // this stack is for keys of objects\arrays
  let key; 
  let value;
  let objValue;
  let match;

  while ((match = tokenizationRE.exec(string)) !== null) { 
    if (match[0] === "{" || match[0] === "[") {
      stack.push(match[0] === "{" ? {} : []); // if match '{' or '[' - we push object to stack and continue to exec once again
      continue;
    } else if (match[0] === "}" || match[0] === "]") { // if match '}' or ']' - we pop object from stack, if stack is empty - we return parsed object
      objValue = stack.pop();
      if (stack.length === 0) {
        return objValue;
      }
    }

    if (match[1]) {   // match[1] - group for keys in JSON. we assign key to match[1] (and removing "" from it)
      key = match[1].slice(1, -1);
      keysStack.push(key); // also pushing key to keyStack
    } else { // if its not key - then we are dealing with value
      if (match[2]) { // match[2] - group for strings
        value = match[2].slice(1, -1);
      } else if (match[3]) { // group for numbers
        value = parseFloat(match[3]);
        if (isNaN(value)) {
          throw new SyntaxError(
            "Invalid JSON format: Numeric value parsing error"
          );
        }
      } else if (match[5]) { // group for boolean
        value = match[5] === "true" ? true : false;
      } else if (match[6]) { // group for null
        value = null;
      } else if (objValue) { // if no groups were found, then it must be object
        value = objValue; 
        key = keysStack[keysStack.length - 1]; // extract key from keysStack, but do not pop it
      }
      if (Array.isArray(stack[stack.length - 1])) { // if objValue is array - we push value to last object in stack
        stack[stack.length - 1].push(value);
      } else {// else = we assign with key:value
        if (!key) {
          throw new SyntaxError("Invalid JSON format: Missing key for object");
        }
        stack[stack.length - 1][key] = value;
        key ? keysStack.pop() : 0; // here we pop key if it exists
      }
    }
  }
  throw new SyntaxError("Invalid JSON format: Incomplete JSON"); // if we are here - then something is wrong, maybe incomplete JSON
}


function validateJSON(str) { // validation JSON
  const tokenizationRE =
    /("[^"]+"(?=\s*:))|("[^"]*")|(\d+(\.\d+)?)|(\btrue\b|\bfalse\b)|(null)|({)|(\[)|(})|(\])|:|,/g; // same regexp but with colons and commas

    const reQuotes = /'[^']+'(?=\s*:)|(?<=:\s*)'[^']*'/g // check for singular quotes 
    const wrongQuotes = str.match(reQuotes) // if at least one key or value with singular quotes - throw error
    if (wrongQuotes) {
      throw new SyntaxError("JSON keys and values can only contain \" \" quotes!!!");
    }
    const tokens = str.match(tokenizationRE)
    counterObj = { // counterObj for counting stuff in the input - like keys should be equal to colons etc.
      keys: 0,
      colon: 0,
      openingObj: 0,
      closingObj: 0,
      openingArr: 0,
      closingArr: 0
    }
    while ((match = tokenizationRE.exec(str)) !== null) {
      if (match[1]) {
        counterObj.keys++;
      }
    }
    console.log(tokens)
    for (let token of tokens) {
      token === ':' ? counterObj.colon++ : 0;
      token === '{' ? counterObj.openingObj++ : 0;
      token === '[' ? counterObj.openingArr++ : 0;
      token === '}' ? counterObj.closingObj++ : 0;
      token === ']' ? counterObj.closingArr++ : 0;
    }
    if (counterObj.keys !== counterObj.colon) {
      throw new SyntaxError("Invalid JSON format: each key should have colon");
    } else if (counterObj.openingObj !== counterObj.closingObj) {
      throw new SyntaxError("Invalid JSON format: some objects are not complete");
    } else if (counterObj.openingArr !== counterObj.closingArr) {
      throw new SyntaxError("Invalid JSON format: some arrays are not complete");
    }
}


const jsonString =
  `{"name": "Alice", "person": {"name": "Bob", "age": 30, "object3": {"abc": null}, "d": {}, "f": true}, "array": [1, {"abs": [null, {"g": "troll"}]}, [1,2], "game"], "age": 28,  "test": 31, "lastTest": [1,2]}`;

const re = myJSONParse(jsonString);
console.log("Object after parsing:", re);
console.log("Array in parsed object:", re.array);
console.log("Super nested troll:", re.array[1].abs[1].g); // it handles even super nested objects!
console.log("Object nested in Array in parsed object:", re.array[1]);
console.log("Object in parsed object:", re.person);
console.log("Empty object in parsed object:", re.d);
console.log("Object in object in parsed object:", re.person.object3);
