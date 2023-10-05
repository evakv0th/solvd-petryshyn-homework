function myJSONParse(string) {
  validateJSON(string);

  const tokenizationRE =
    /("[^"]+"(?=\s*:))|("[^"]*")|(\d+(\.\d+)?)|(\btrue\b|\bfalse\b)|(null)|({)|(\[)|(})|(\])/g;
  const stack = [];
  const keysStack = [];
  let key;
  let value;
  let objValue;
  let match;

  while ((match = tokenizationRE.exec(string)) !== null) {
    if (match[0] === "{" || match[0] === "[") {
      stack.push(match[0] === "{" ? {} : []);
      continue;
    } else if (match[0] === "}" || match[0] === "]") {
      objValue = stack.pop();
      if (stack.length === 0) {
        return objValue;
      }
    }

    if (match[1]) {
      key = match[1].slice(1, -1);
      keysStack.push(key);
    } else {
      if (match[2]) {
        value = match[2].slice(1, -1);
      } else if (match[3]) {
        value = parseFloat(match[3]);
        if (isNaN(value)) {
          throw new SyntaxError(
            "Invalid JSON format: Numeric value parsing error"
          );
        }
      } else if (match[5]) {
        value = match[5] === "true" ? true : false;
      } else if (match[6]) {
        value = null;
      } else if (objValue) {
        value = objValue;
        key = keysStack[keysStack.length - 1];
      }
      if (Array.isArray(stack[stack.length - 1])) {
        stack[stack.length - 1].push(value);
      } else {
        if (!key) {
          throw new SyntaxError("Invalid JSON format: Missing key for object");
        }
        stack[stack.length - 1][key] = value;
        key ? keysStack.pop() : 0;
      }
    }
  }
  throw new SyntaxError("Invalid JSON format: Incomplete JSON");
}


function validateJSON(str) {
  const tokenizationRE =
    /("[^"]+"(?=\s*:))|("[^"]*")|(\d+(\.\d+)?)|(\btrue\b|\bfalse\b)|(null)|({)|(\[)|(})|(\])|:|,/g;

    const tokens = str.match(tokenizationRE)
    console.log(tokens)
}


const jsonString =
  '{"name": "Alice", "person": {"name": "Bob", "age": 30, "object3": {"abc": null}, "d": {}, "f": true}, "array": [1, {"abs": true}, "game"], "age": 28,  "test": 31}';

const re = myJSONParse(jsonString);
console.log("Object after parsing:", re);
console.log("Array in parsed object:", re.array);
console.log("Object nested in Array in parsed object:", re.array[1]);
console.log("Object in parsed object:", re.person);
console.log("Empty object in parsed object:", re.d);
console.log("Object in object in parsed object:", re.person.object3);
