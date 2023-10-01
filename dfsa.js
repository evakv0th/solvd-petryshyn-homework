const tokens = [
  "{",
  '"name"',
  ":",
  '"Bob"',
  ",",
  '"age"',
  ":",
  "30",
  ",",
  '"object3"',
  ":",
  "{",
  '"abc"',
  ":",
  "null",
  "}",
  ",",
  '"f"',
  ":",
  "true",
  "}",
];

counter = 0;

function parseObject() {
  const obj = {};
  counter++;
  while (tokens[counter] !== "}") {
    if (tokens[counter] === ",") {
      counter++;
    }
    const key = parseValue();
    console.log(counter, key);
    counter = counter + 2;
    console.log(counter);
    const value = parseValue();
    obj[key] = value;
    console.log(key, value);

    counter++;
  }
  return obj;
}

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

  throw new SyntaxError(`Invalid token: ${token}`);
}

console.log(parseObject(tokens).object3);
