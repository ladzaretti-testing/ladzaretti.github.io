// TERMINAL elements
const terminal = document.querySelector(".terminal-container");
const terminalBody = document.querySelector(".terminal-container .body");
const terminaDocklIcon = document.querySelector("#terminal-icon");
const terminalRed = document.querySelector(".circle.red");
const terminalYellow = document.querySelector(".circle.yellow");
const terminalGreen = document.querySelector(".circle.green");
// Terminal events
function visable(el) {
  return !!(
    (el.offsetWidth || el.offsetHeight || el.getClientRects().length) &&
    window.getComputedStyle(el).visibility !== "hidden"
  );
}

// check if element is visable/displayed
function toggleDisplay(el, disp) {
  if (visable(el)) el.style.display = "none";
  else el.style.display = disp;
}

// set click events for the UI buttons
[terminaDocklIcon, terminalRed, terminalGreen].forEach((item) =>
  item.addEventListener("click", () => {
    toggleDisplay(terminal, "block");
    if (item == terminalRed)
      terminaDocklIcon.classList.toggle("li-first", false);
    if (item == terminaDocklIcon)
      terminaDocklIcon.classList.toggle("li-first", true);
  })
);

terminalYellow.addEventListener("click", () => {
  terminal.classList.toggle("terminal-maximize");
  if (terminalYellow.dataset.maximize === "false") {
    terminalYellow.dataset.maximize = "true";
  } else {
    terminalYellow.dataset.maximize = "false";
  }
  updateBashSize();
});

// get text width in pixels
function getTextWidth(text, font) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font || getComputedStyle(document.body).font;
  return context.measureText(text).width;
}

const bodyComputedStyle = window.getComputedStyle(terminalBody);
const bashTitle = document.querySelector(".terminal .title");

// compute terminal body size in rows of text and columns of chars
const computeBashSize = (computedStyle) => {
  const h = terminalBody.clientHeight;
  const w =
    terminalBody.clientWidth -
    parseInt(computedStyle.paddingLeft) -
    parseInt(computedStyle.paddingRight);
  const lineHeight = parseInt(computedStyle.lineHeight);
  const charWidth = getTextWidth("A", computedStyle.font);
  //  get "bash" size
  const bashH = Math.floor(h / lineHeight);
  const bashW = Math.floor(w / charWidth);
  return `-zsh -- ${bashW}x${bashH}`;
};

// update current bash size as terminal title
const updateBashSize = () => {
  const innerText = computeBashSize(bodyComputedStyle);
  bashTitle.innerText = innerText;
};

// init terminal title - "bash" size
updateBashSize();

// update on resize end
window.onresize = () => {
  clearTimeout(window.resized);
  window.resized = setTimeout(updateBashSize, 100);
};

console.info("terminal script loaded");

export default terminalBody;
