import "../css/style.css";

const sudokuState = {};

const fieldInput = (event, fieldIndex, fields) => {
  const key = event.key;
  const specialKeysArray = [
    "Tab",
    "Backspace",
    "Delete",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft"
  ];
  const isAllowedInput = /^[1-9]+$/.test(key);
  const isSpecialKey = specialKeysArray.includes(key);
  if (!isAllowedInput && !isSpecialKey) {
    event.preventDefault();
  } else {
    if (smartCheck(fields[fieldIndex], key) === "Yes") {
      event.preventDefault();
      alert("Not allowed, duplicate number");
    } else {
      fields[fieldIndex].style.color = "red";
    }
  }
};

const solveSudoku = () => {
  let logicChecker = 0;
  let squaresSolved = 0;
  for (logicChecker; logicChecker < 1; logicChecker++) {
    const sudoku = [...document.querySelectorAll("[data-sudoku] input")];
    sudoku.forEach((field, index) => {
      const cField = field;
      let possibleValuesArr = [];
      let idealNumber = "";
      if (field.value === "") {
        for (let cno = 1; cno < 10; cno++) {
          if (smartCheck(cField, cno.toString()) === "No") {
            possibleValuesArr.push(cno);
            idealNumber = cno.toString();
          }
        }

        if (possibleValuesArr.length === 1 && idealNumber !== "") {
          field.value = idealNumber;
          field.style.color = "#03730A";
          logicChecker = 0;
          squaresSolved++;
          setTimeout(() => {}, 100);
        }
      }
    });
    for (let i = 1; i < 10; i++) {
      let sqArr = [];
      let rqdNumbers = [];
      const squareNode = [
        ...document.querySelectorAll("." + "sq-" + i + " " + "input")
      ];
      squareNode.forEach(field => {
        if (field.value !== "") {
          sqArr.push(field.value);
        }
      });

      for (let no = 1; no < 10; no++) {
        const noStr = no.toString();
        if (!sqArr.includes(noStr)) {
          rqdNumbers.push(noStr);
        }
      }

      if (rqdNumbers.length > 0) {
        rqdNumbers.map(n => {
          let ntimes = rqdNumbers.length;
          let oddTimes = 0;
          let oddField;
          squareNode.forEach((field, fieldIndex, fields) => {
            if (field.value === "") {
              const smartResponse = smartCheck(field, n.toString());
              if (smartResponse === "Yes") {
                ntimes -= 1;
              } else if (ntimes !== 1 && smartResponse === "No") {
                oddTimes += 1;
                oddField = field;
              }

              if (smartResponse === "No" && ntimes === 1) {
                field.value = n.toString();
                field.style.color = "#03730A";
                logicChecker = 0;
                squaresSolved++;
              } else if (smartResponse === "Yes") {
                if (ntimes === 1 && oddTimes === 1) {
                  oddField.value = n.toString();
                  oddField.style.color = "#03730A";
                  logicChecker = 0;
                  squaresSolved++;
                }
              }
            }
          });
        });
      }
    }
    //horizontal line here
    for (let i = 1; i < 10; i++) {
      let hrArr = [];
      let rqdHrNumbers = [];
      const hNode = [...document.querySelectorAll("." + "hline-h" + i)];
      hNode.forEach(field => {
        if (field.value !== "") {
          hrArr.push(field.value);
        }
      });

      for (let no = 1; no < 10; no++) {
        const noStr = no.toString();
        if (!hrArr.includes(noStr)) {
          rqdHrNumbers.push(noStr);
        }
      }

      if (rqdHrNumbers.length > 0) {
        rqdHrNumbers.map(n => {
          let ntimes = rqdHrNumbers.length;
          let oddTimes = 0;
          let oddField;
          // h strat here
          hNode.forEach((field, fieldIndex, fields) => {
            if (field.value === "") {
              const smartResponseH = smartCheck(field, n.toString());
              if (smartResponseH === "Yes") {
                ntimes -= 1;
              } else if (ntimes !== 1 && smartResponseH === "No") {
                oddTimes += 1;
                oddField = field;
              }

              if (smartResponseH === "No" && ntimes === 1) {
                field.value = n.toString();
                field.style.color = "#03730A";
                logicChecker = 0;
                squaresSolved++;
                setTimeout(() => {}, 100);
              } else if (smartResponseH === "Yes") {
                if (ntimes === 1 && oddTimes === 1) {
                  oddField.value = n.toString();
                  oddField.style.color = "#03730A";
                  logicChecker = 0;
                  squaresSolved++;
                  setTimeout(() => {}, 100);
                }
              }
            }
          });
          // h ends here
        });
      }
    }
    // vertical line here
    for (let i = 1; i < 10; i++) {
      let vrArr = [];
      let rqdVrNumbers = [];
      const vNode = [...document.querySelectorAll("." + "vline-v" + i)];
      vNode.forEach(field => {
        if (field.value !== "") {
          vrArr.push(field.value);
        }
      });

      for (let no = 1; no < 10; no++) {
        const noStr = no.toString();
        if (!vrArr.includes(noStr)) {
          rqdVrNumbers.push(noStr);
        }
      }

      if (rqdVrNumbers.length > 0) {
        rqdVrNumbers.map(n => {
          let ntimes = rqdVrNumbers.length;
          let oddTimes = 0;
          let oddField;
          // v starts here
          vNode.forEach((field, fieldIndex, fields) => {
            if (field.value === "") {
              const smartResponsV = smartCheck(field, n.toString());
              if (smartResponsV === "Yes") {
                ntimes -= 1;
              } else if (ntimes !== 1 && smartResponsV === "No") {
                oddTimes += 1;
                oddField = field;
              }

              if (smartResponsV === "No" && ntimes === 1) {
                field.value = n.toString();
                field.style.color = "#03730A";
                logicChecker = 0;
                squaresSolved++;
              } else if (smartResponsV === "Yes") {
                if (ntimes === 1 && oddTimes === 1) {
                  oddField.value = n.toString();
                  oddField.style.color = "#03730A";
                  logicChecker = 0;
                  squaresSolved++;
                }
              }
            }
          });

          // v ends here
        });
      }
    }
  }
  if (squaresSolved === 0) {
    alert(
      "Unfortunately!! I was unable to solve this Sudoku, come back another time!!"
    );
  } else {
    alert("Manage to solve only" + " " + squaresSolved);
  }
};

const resetInputs = () => {};

const clearInputs = () => {
  const Inputs = [...document.querySelectorAll("input")];
  Inputs.forEach(field => {
    field.value = "";
  });
};

const smartCheck = (ffield, cKey) => {
  const key = cKey;
  let duplicateNo = "No";
  const currentSquare = ffield.getAttribute("class").split(" ")[0];
  const currentHorizontalSquares = ffield.getAttribute("class").split(" ")[1];
  const currentVerticalSquares = ffield.getAttribute("class").split(" ")[2];
  const squareNodeList = [...document.querySelectorAll("." + currentSquare)];

  squareNodeList.forEach(field => {
    //sudokuState.squares[]
    if (key === field.value) {
      return (duplicateNo = "Yes");
    }
  });

  const hNodeList = [
    ...document.querySelectorAll("." + currentHorizontalSquares)
  ];
  hNodeList.forEach(field => {
    if (key === field.value) {
      return (duplicateNo = "Yes");
    }
  });

  const vNodeList = [
    ...document.querySelectorAll("." + currentVerticalSquares)
  ];

  vNodeList.forEach(field => {
    if (key === field.value) {
      return (duplicateNo = "Yes");
    }
  });
  return duplicateNo;
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
  sudokuState.squares = [];
  sudokuState.horizontal = [];
  sudokuState.vertical = [];
};

startSudoku();
