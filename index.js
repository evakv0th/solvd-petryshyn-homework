const jsonString =
  '{"name": "Alice", "age": 28, "person": {"name": "Bob", "age": 30, "object3": {"abc": null} , "f": true}, "array": [1, {"abs": true}, "game"], "testlast": 28}';

function myJSONParse(string) {
  let JSONre =
    /("[^"]+"\s*:\s*(?:"[^"]*"|\d+(\.\d+)?|\btrue\b|\bfalse\b|\[.*\]|null|\{[^{}]*\}|\s*{.*}(?=.+)\s*))+/g;
  console.log(string.match(JSONre));
  if (!JSONre.test(string)) {
    throw new SyntaxError("Invalid JSON format");
  }
  const tokenizationRE =
    /"[^"]+"(?=\s*:)|("[^"]*"|\d+(\.\d+)?|\btrue\b|\bfalse\b|null)|{(?=\s*")|}|,|\[|\]|:/g;
  const tokens = string.match(tokenizationRE);

  console.log(tokens);
  let counter = 0;

  function parseValue() {
    const token = tokens[counter];

    if (token === "{") {
      return parseObject();
    } else if (token === "[") {
      return parseArray();
    } else if (/"[^"]*"/.test(token)) {
      return token.slice(1, -1);
    } else if (/\d+(\.\d+)?/.test(token)) {
      return parseFloat(token);
    } else if (/\s*false\s*|\s*true\s*/.test(token)) {
      return token.replace(/\s*/, "");
    } else if (/\s*null\s*/.test(token)) {
      return null;
    }
    console.log(token);
    throw new SyntaxError(`Invalid token: ${token}`);
  }

  function parseArray() {
    const arr = [];
    counter++;

    while (tokens[counter] !== "]") {
      if (tokens[counter] === "," || tokens[counter] === ":") {
        counter++;
      }
      const value = parseValue();
      arr.push(value);

      counter++;
    }
    return arr;
  }
  function parseObject() {
    const obj = {};
    counter++;
    while (tokens[counter] !== "}") {
      if (tokens[counter] === ",") {
        counter++;
      }
      const key = parseValue();

      counter = counter + 2;
      const value = parseValue();
      obj[key] = value;
      counter++;
    }
    return obj;
  }
  const result = parseObject();
  return result;
}

const re = myJSONParse(jsonString);
console.log("Object after parsing:", re);
console.log("Array in parsed object:", re.array);
console.log("Object nested in Array in parsed object:", re.array[1]);
console.log("Object in parsed object:", re.person);
console.log("Object in object in parsed object:", re.person.object3);

console.log(JSON.parse(jsonString));
