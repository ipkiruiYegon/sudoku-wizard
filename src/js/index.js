import "../css/style.css";

const fieldInput = (event, fieldIndex, fields) => {
  const key = event.key;
  const isAllowedInput = /^[0-9]+$/.test(key);
  if (!isAllowedInput) {
    event.preventDefault();
  }
};

const solveSudoku = () => {
  console.log(document.querySelectorAll("[data-sudoku] input").values());
  if (document.querySelectorAll("[data-sudoku] input").values() === "") {
    alert("Enter");
  }
};
const resetInputs = () => {};

const clearInputs = () => {
  const Inputs = [...document.querySelectorAll("input")];
  Inputs.forEach(field => {
    field.value = "";
  });
};

const startSudoku = () => {
  const allInputs = [...document.querySelectorAll("input")];
  allInputs.forEach((field, index, fields) => {
    field.addEventListener("keydown", event => {
      fieldInput(event, index, fields);
    });
  });
  document
    .querySelector("[data-start-btn]")
    .addEventListener("click", solveSudoku);
  document
    .querySelector("[data-reset-btn]")
    .addEventListener("click", resetInputs);
  document
    .querySelector("[data-clear-btn]")
    .addEventListener("click", clearInputs);
};

startSudoku();
