function highlightKeywords(string, keywords) {
  const result = string.split(" ");

  return result.map((word) => {
    if (keywords.includes(word)) {
      return `<span class='highlight'>${word}</span>`;
    } else {
      return word;
    }
  }).join(' ');
}

const keywords = ["JavaScript", "template", "tagged"];
const template =
  "Learn JavaScript tagged templates to create custom template literals for tagged manipulation.";

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."
