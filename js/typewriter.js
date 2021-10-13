// typewriter effect

const sample =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, vero.";

function typewriter(selector, str = sample, ms = 50, deley = 0) {
  let i = 0;

  let type = () => {
    if (i < str.length) {
      let char = str[i];
      document.querySelector(selector).innerHTML +=
        char === "\n" ? "<br>" : char;
      i++;
      setTimeout(type, ms);
    }
  };

  setTimeout(type, deley);
}
