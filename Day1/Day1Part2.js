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

  for (let i = 0; i < text.length; i++) {
    if (!isNaN(text[i])) {
      numInText.push(text[i]);
    } else {
      const threeLetterNumber = checkText(text[i] + text[i + 1] + text[i + 2]);
      const fourLetterNumber = checkText(
        text[i] + text[i + 1] + text[i + 2] + text[i + 3]
      );
      const fiveLetterNumber = checkText(
        text[i] + text[i + 1] + text[i + 2] + text[i + 3] + text[i + 4]
      );

      if (checkIfNum(threeLetterNumber)) {
        numInText.push(threeLetterNumber);
      }
      if (checkIfNum(fourLetterNumber)) {
        numInText.push(fourLetterNumber);
      }
      if (checkIfNum(fiveLetterNumber)) {
        numInText.push(fiveLetterNumber);
      }
    }
  }

  let calibration = parseInt(
    numInText[0].toString().concat(numInText[numInText.length - 1])
  );

  return cb(null, calibration);
}

function checkText(text) {
  switch (text) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return undefined;
  }
}

function checkIfNum(num) {
  if (!isNaN(num)) {
    return true;
  }

  return false;
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day1/input.txt",
  (err, result) => {
    if (err) console.log(err);

    console.log(result);
  }
);
