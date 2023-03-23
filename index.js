/*
TODO
set pannel settings UI at left of grid
-> faire un color picker
-> faire un slider (quel est l'event a écouter onChange() ?)


the option will be ->
1) slider : choose number of grid nXn with a slider from 1 to 100
2) Rainbow : set up the rainbow picker color
3) clear grid
4) Color (and picker below)
Each option require visual effect to see they are selected

*/
let numberGrid = 16;
let currentOption = "COLOR";
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
const grid = document.querySelector(".grid");
const optionButton = document.querySelectorAll(".optionButton > button");

const buttonRainbow = document.querySelector(".rainbow");
const buttonErase = document.querySelector(".erase");
const buttonClear = document.querySelector(".clear");
const buttonColor = document.querySelector(".color");

const colorPicker = document.querySelector("#colorpicker");

buttonColor.addEventListener("click", () => {
  buttonColor.classList.add("selected");
  currentOption = "COLOR";
  buttonRainbow.classList.remove("selected");
  buttonErase.classList.remove("selected");
});

buttonRainbow.addEventListener("click", () => {
  buttonRainbow.classList.add("selected");
  currentOption = "RAINBOW";
  buttonColor.classList.remove("selected");
  buttonErase.classList.remove("selected");
});
buttonErase.addEventListener("click", () => {
  buttonErase.classList.add("selected");
  currentOption = "ERASE";
  buttonRainbow.classList.remove("selected");
  buttonColor.classList.remove("selected");
});
buttonClear.addEventListener("click", () => {
  clearGrid();
  setGridSize();
});

setGridSize();

// const square = document.createElement("div");
// square.classList.add("square");

function setGridSize(newValue = numberGrid) {
  const heightGrid = grid.clientHeight;
  const widthGrid = grid.clientWidth;

  for (let indexR = 0; indexR < newValue; indexR++) {
    for (let indexC = 0; indexC < newValue; indexC++) {
      const square = document.createElement("div");
      square.style.height = `${heightGrid / newValue}px`;
      square.style.width = `${widthGrid / newValue}px`;
      square.classList.add("square");

      square.addEventListener("mousedown", paint);

      square.addEventListener("mouseover", paint);

      grid.appendChild(square);
    }
  }
}

function paint(e) {
  if (e.type === "mouseover" && !mouseDown) {
    return;
  }
  let divTargeted = e.target;
  switch (currentOption) {
    case "COLOR":
      divTargeted.style.backgroundColor = colorPicker.value;
      break;
    case "RAINBOW":
      divTargeted.style.backgroundColor = `rgb(${getRandomRgb()}, ${getRandomRgb()}, ${getRandomRgb()})`;
      break;
    case "ERASE":
      divTargeted.style.backgroundColor = "white";
      break;

    default:
      break;
  }
}
// ${getRandomRgb}
function getRandomRgb(max = 256) {
  return Math.floor(Math.random() * max);
}

const slider = document.querySelector("#sizeGrid");
const sliderLabel = document.querySelector(".slider > label");
slider.addEventListener("change", getNewSizeGrid);

function changeLabelSize(e) {
  console.log(e);
  const newValue = e.target.value;
  sliderLabel.textContent = `${newValue}x${newValue}`;
}

function getNewSizeGrid(e) {
  const newValue = e.target.value;
  sliderLabel.textContent = `${newValue}x${newValue}`;
  numberGrid = newValue;
  clearGrid();
  setGridSize();
}

function clearGrid() {
  grid.querySelectorAll("*").forEach((child) => child.remove());
}
