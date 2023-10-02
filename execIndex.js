const jsonString =
  '{"name": "Alice", "age": 28, "person": {"name": "Bob", "age": 30, "object3": {"abc": null} , "f": true}, "d": {}, "array": [1, {"abs": true}, "game"], "testlast": 28}';

function myJSONParse(string) {
  let JSONre =
    /("[^"]+"\s*:\s*(?:"[^"]*"|\d+(\.\d+)?|\btrue\b|\bfalse\b|\[.*\]|null|\{[^{}]*\}|\s*{.*}(?=.+)\s*))+/g;
  if (!JSONre.test(string)) {
    throw new SyntaxError("Invalid JSON format");
  }

  const tokenizationRE =
    /("[^"]+"(?=\s*:))|("[^"]*")|(\d+(\.\d+)?)|(\btrue\b|\bfalse\b)|(null)|({|\[)|}|,|\]|:/g;
  console.log(string.match(tokenizationRE));
  function parseValue() {
    if (match[1]) {
      console.log(match[1]);
      return match[1].slice(1, -1);
    } else if (match[2]) {
      console.log(match[2], "STRING");
      return match[2].slice(1, -1);
    } else if (match[3]) {
      console.log(match[3]);
      return parseFloat(match[3]);
    } else if (match[5]) {
      return match[5] === "true" ? true : false;
    } else if (match[6]) {
      return null;
    } else if (match[7]) {
      console.log(match[7]);
      return match[7] === "{" ? parseObject() : parseArray();
    }
  }

  function parseArray() {
    const arr = [];
    match = tokenizationRE.exec(string);

    while (match[0] !== "]") {
      if (match[0] === "," || match[0] === ":") {
        match = tokenizationRE.exec(string);
      }
      const value = parseValue();
      arr.push(value);

      match = tokenizationRE.exec(string);
    }
    return arr;
  }
  function parseObject() {
    const obj = {};
    let key;
    match = tokenizationRE.exec(string);
    while (match[0] !== "}") {
      if (match[0] === "," || match[0] === "{") {
        match = tokenizationRE.exec(string);
      } else if (match[0] === "}") {
        break;
      }

      key = parseValue(string);
      match = tokenizationRE.exec(string);
      match = tokenizationRE.exec(string);

      if (match[0] === "}") {
        break;
      }
      const value = parseValue(string);
      obj[key] = value;
      console.log(key, value, "test");
      match = tokenizationRE.exec(string);
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
console.log("Empty object in parsed object:", re.d);
console.log("Object in object in parsed object:", re.person.object3);

console.log(JSON.parse(jsonString));
