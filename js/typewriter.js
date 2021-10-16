// typewriter effect

let i = 0;
let type = (str, el, ms) => {
  if (i < str.length) {
    let char = str[i];
    let output = "";
    if (char == "\\") {
      let substr = "";
      while (++i < str.length && str[i] !== "\\") {
        substr += str[i];
      }
      output = substr;
    } else {
      output = char === "\n" ? "" : char;
    }
    i++;
    el.innerHTML += output;
    setTimeout(() => type(str, el, ms), ms);
  }
};

function typewriterFetch(selector, path, ms = 50, deley = 0) {
  fetch(path)
    .then((res) => res.text())
    .then((text) =>
      setTimeout(() => {
        type(text, document.querySelector(selector), ms);
      }, deley)
    );
}

function typewriter(selector, str, ms = 50, deley = 0) {
  let i = 0;
  setTimeout(() => {
    type(str, document.querySelector(selector), ms);
  }, deley);
}
