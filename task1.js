const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

const greeting = "greet";
const introduction = "intro";

function localize(strings, ...expressions) {
  return function (language) {
    if (!translations[language]) {
      throw new Error('there are no such language in our translation dictionary')
    }
    const translation = translations[language];
    let result = strings[0];

    for (let i = 0; i < expressions.length; i++) {
      result += translation[expressions[i]] + strings[i + 1];
    }

    return result;
  };
}

const example = localize`${greeting}, ${introduction}`;

console.log(example("en"));
console.log(example("fr"));

