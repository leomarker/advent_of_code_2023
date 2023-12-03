import fs from "fs";

function readInput(path, cb) {
  let input;
  fs.readFile(path, "utf-8", (err, data) => {
    input = data.split("\n");

    processInputs(input);

    cb(null, input);
  });
}

function processInputs(inputs) {
  findPartNumber(inputs[0], inputs[1]);
}

function findPartNumber(lineOne, lineTwo) {
  let digit = false;
  let char = false;
  let coordinates = [];
  let digitCoordinates = [];

  for (let i = 0; i < lineOne.length; i++) {
    if (lineOne[i] !== ".") {
      if (!isNaN(lineOne[i])) {
        if (digitCoordinates[0] === null) {
          digitCoordinates[0] = i - 1 === -1 ? 0 : i - 1;
        }
      } else {
        digitCoordinates[1] = i;
      }
    }
  }

  console.log(coordinates);
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day3/input.txt",
  (err, result) => {
    if (err) console.log(err);

    console.log(result);
  }
);
