import fs from "fs";

async function readInput(filePath, cb) {
  let texts;
  fs.readFile(filePath, "utf-8", (err, data) => {
    texts = data.split("\n");
    console.log(texts);

    calculateCalibration(texts, (err, result) => {
      if (err) console.log(err);

      return cb(null, result);
    });
  });
}

function calculateCalibration(texts, cb) {
  let calibrationSum = 0;

  texts.forEach((text) => {
    getCalibrationValue(text, (err, num) => {
      calibrationSum = calibrationSum + num;
    });
  });

  return cb(null, calibrationSum);
}

function getCalibrationValue(text, cb) {
  let numInText = [];

  for (const char of text) {
    if (!isNaN(char)) {
      numInText.push(char);
    }
  }

  let calibration = parseInt(
    numInText[0].concat(numInText[numInText.length - 1])
  );

  return cb(null, calibration);
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day1/input.txt",
  (err, result) => {
    if (err) console.log(err);

    console.log(result);
  }
);
