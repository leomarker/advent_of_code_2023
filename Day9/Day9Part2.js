import fs from "fs";

class MirageMaintenance {
  constructor(input) {
    this.allHistory = this.parseInput(input);
  }

  parseInput(input) {
    const history = [];
    const report = input.split("\n");

    report.forEach((element, index) => {
      let nums = element.split(" ").map((num) => parseInt(num, 10));
      let zero = false;
      let predictions = [];
      let calHist = 0;

      predictions.push(nums);

      while (!zero) {
        let prediction = [];

        for (let i = 0; i < nums.length - 1; i++) {
          let difference = nums[i + 1] - nums[i];
          prediction.push(difference);
        }

        predictions.push(prediction);

        zero = prediction.every((element) => element === 0);
        nums = prediction;
      }

      console.log(predictions);

      for (let i = predictions.length - 1; i > 0; i--) {
        let a = predictions[i];
        let b = predictions[i - 1];

        console.log(a, b, "aaa");

        calHist = a.slice(-1)[0] + b.slice(-1)[0];
        b.unshift(calHist);
      }

      console.log(calHist);

      history.push(calHist);
    });

    return history;
  }

  partTwo() {
    let total = 0;
    this.allHistory.forEach((his) => (total = total + his));
    return total;
  }
}

function readInput(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      return cb(err);
    }

    cb(null, data);
  });
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day9/inputPart2.txt",
  (err, data) => {
    if (err) console.log(err);

    const mirageMaintenance = new MirageMaintenance(data);

    const result = mirageMaintenance.partTwo();

    console.log(result);
  }
);
