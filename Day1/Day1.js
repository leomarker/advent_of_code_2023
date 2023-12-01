function readInput(input) {
  let texts = input.split("\n");
  console.log(texts);

  return calculateCalibration(texts);
}

function calculateCalibration(texts) {
  let calibrationSum = 0;

  texts.forEach((text) => {
    getCalibrationValue(text, (err, num) => {
      calibrationSum = calibrationSum + num;
    });
  });

  return calibrationSum;
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

readInput(`1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`);
