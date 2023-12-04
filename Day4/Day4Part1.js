import fs from "fs";

function readInput(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      return cb(err);
    }

    cb(null, data.split("\n"));
  });
}

function processInputs(inputs) {
  let total = 0;

  inputs.forEach((input) => {
    total = total + processInput(input);
  });

  return total;
}

function processInput(input) {
  let processed = input.split("|");

  let winningNumbers = processed[0].split(":")[1].trim().split(" ");
  let numbersIHave = processed[1]
    .trim()
    .split(" ")
    .filter((num) => num !== "");

  return howManyAreWinning(winningNumbers, numbersIHave);
}

function howManyAreWinning(winningNumbers, numbers) {
  let total = 0;

  winningNumbers.forEach((num) => {
    if (numbers.includes(num)) {
      if (total === 0) {
        ++total;
      } else {
        total = total * 2;
      }
    }
  });

  return total;
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day4/input.txt",
  (err, input) => {
    if (err) console.log(err);

    let result = processInputs(input);

    console.log(result);
  }
);
