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

const jsonString2 = '{"name": "Alice", "age": 28, "person": {"name": "Bob", "age": 30}}';

function myJSONParse(string) {
  try {
    let JSONre = /^{.*}$/;
    console.log(string)
    console.log(JSONre.test(string))
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

myJSONParse(jsonString2)