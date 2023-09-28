const jsonString = '{"name": "Alice", "age": 28, "person": {"name": "Bob", "age": 30}}';

// function myJSONParseExample(string) {
//   try {
//     const jsObject = JSON.parse(string);
//     for (let key in jsObject) {
//       if (jsObject.hasOwnProperty(key)) {
//         console.log(key + ": " + jsObject[key]);
//       }
//     }
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//   }
// }


// myJSONParseExample(jsonString)

const jsonString2 = '{"name": "Alice", "age": 28, "person": {"name": "Bob", "age": 30, "object3": {"abc": null}, "f": true}, "array": [1, "game"]}';

function myJSONParse(string) {
  try {
    let JSONre = /^{.*}$/;
    console.log(JSONre.test(string))

    let reKeys = /"[^"]+"(?=\s*:)|(?<=.){(?=\s*")|}(?=\s*,)/g;
    const matchesKeys = jsonString2.match(reKeys)
    console.log(matchesKeys)
    let reVal = /(?<=:\s*)("[^"]*"|\d+(\.\d+)?|\btrue\b|\bfalse\b|null|\[[^\[\]]*\])|(?<=.){(?=\s*")|}(?=\s*,)/g
    const matchesVal = jsonString2.match(reVal)
    console.log(matchesVal)
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

myJSONParse(jsonString2)