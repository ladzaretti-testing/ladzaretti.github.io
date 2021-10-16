// typewriter effect

function typewriterFetch(selector, path, ms = 50, deley = 0) {
  let i = 0;
  let type = (str) => {
    if (i < str.length) {
      let char = str[i];
      document.querySelector(selector).innerHTML += char === "\n" ? "" : char;
      i++;
      setTimeout(() => type(str), ms);
    }
  };
  fetch(path)
    .then((res) => res.text())
    .then((text) =>
      setTimeout(() => {
        console.log(`|${text}|`);

        type(text);
      }, deley)
    );
}

function typewriter(selector, str, ms = 50, deley = 0) {
  let i = 0;
  let type = () => {
    if (i < str.length) {
      let char = str[i];
      document.querySelector(selector).innerHTML += char === "\n" ? "" : char;
      i++;
      setTimeout(type, ms);
    }
  };
  setTimeout(type, deley);
}
