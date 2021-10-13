// init terminal
import terminalBody from "./terminal.js";

// init dock
import "./dock.js";

("use strict");

// screen size presets
const GRIDD_LG = 992;
const GRID_MD = 768;
const Grid_SM = 567;
const FONT_SIZE_PX = 14;

// colors preset
const darkBackgroundModes = [
  // "#282C34", // day
  "#1565C0", // Denim
  "#1ABC9C", // Mountain Meadow
  "#E74C3C", // Cinnabar
  "#9B59B6", // Wisteria
  "#E67E22", // Zest
  "#3498DB", // Curious Blue
];
const lightBackgroundModes = [
  // "#FAFAFA", // night
  "#FFCDD2", // Pastel Pink
  "#E1BEE7", // French Lilac
  "#C8E6C9", // Zanah
  "#B3E5FC", // French Pass
  "#FFF9C4", // Lemon Chiffon
];

const rootElement = document.documentElement;
const mainClickArea = document.querySelector(".clickable");
const navbar = document.querySelector(".navbar");
const navSocialIcons = document.querySelector("#social-icons");
const darkModeToggler = document.querySelector("#dark-mode-toggler");
const aboutSection = document.getElementById("about");
const accordionItems = document.querySelectorAll(".accordion-item");
const accordionButtons = document.querySelectorAll("#about button");
const projects = document.querySelector("#projects");
const projectsCards = document.querySelectorAll(".card");
const modalButton = document.querySelector("#contact-modal .btn-accent");

// create color generation function
// than add color chaange on click to tag <main>
function* colorGen(colorArr) {
  let length = colorArr.length;
  for (let i = 0; ; i++) {
    yield colorArr[i % length];
  }
}

function adjustColor(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

// init color gens
const lightColorGen = colorGen(lightBackgroundModes);
const darkColorGen = colorGen(darkBackgroundModes);
function changeBG(color = "#282C34") {
  rootElement.style.setProperty("--accent", color);
  // rootElement.style.setProperty("--accent-dark", adjustColor(color, 40));
}

const btn = [].forEach.call(
  document.querySelectorAll(".change-color"),
  (item) =>
    item.addEventListener("click", (e) => {
      let color = item.dataset.color;
      rootElement.style.setProperty("--accent", color);
    })
);

// Change navbar apperance based on scroll location
const condark = document.querySelector(".toggle-container");
navSocialIcons.style.display = "none";

window.onscroll = function () {
  "use strict";
  let navSocialIcons = document.querySelector("#social-icons");
  let vpHeight = window.innerHeight;
  if (
    document.body.scrollTop >= vpHeight ||
    document.documentElement.scrollTop >= vpHeight
  ) {
    navSocialIcons.style.display = "flex";
  } else {
    navSocialIcons.style.display = "none";
  }
};

// Toggle main theme color
const toogleTheme = () => {
  navbar.classList.toggle("navbar-light");
  navbar.classList.toggle("navbar-dark");
  aboutSection.classList.toggle("text-light");
  aboutSection.classList.toggle("bg-material-grey-background");
  modalButton.classList.toggle("text-light");
  terminalBody.classList.toggle("text-dark");
  terminalBody.classList.toggle("bg-light");
  accordionItems.forEach((item) =>
    item.classList.toggle("bg-material-grey-800")
  );
  accordionButtons.forEach((item) =>
    item.classList.toggle("bg-material-grey-background")
  );
  projects.classList.toggle("text-light");
  projects.classList.toggle("bg-material-grey-background-lighten");
  projectsCards.forEach((item) => {
    item.classList.toggle("bg-material-grey-800");
    item.classList.toggle("card-dark");
  });
};

// init background color and theme (dark)
let color = colorGen(darkBackgroundModes);
changeBG(color.next().value);
terminalBody.classList.toggle("text-dark");
terminalBody.classList.toggle("bg-light");
toogleTheme();

// init background color and theme (light)
// let color = colorGen(lightBackgroundModes);
// changeBG(color.next().value);
// terminalBody.classList.toggle("text-dark");
// terminalBody.classList.toggle("bg-light");

// Dark mode toggle
darkModeToggler.addEventListener("click", (e) => {
  const el = e.target;
  toogleTheme();
  if (el.dataset.dark_mode_on === "true") {
    color = colorGen(lightBackgroundModes);
    changeBG(color.next().value);
    el.dataset.dark_mode_on = "false";
  } else {
    color = colorGen(darkBackgroundModes);
    changeBG(color.next().value);
    el.dataset.dark_mode_on = "true";
  }
});

// Add on click bg color change callback
mainClickArea.addEventListener("click", () => {
  changeBG(color.next().value);
});
