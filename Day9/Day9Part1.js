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

      for (let i = predictions.length - 1; i > 0; i--) {
        let a = predictions[i];
        let b = predictions[i - 1];

        calHist = a.slice(-1)[0] + b.slice(-1)[0];
        b.push(calHist);
      }

      history.push(calHist);
    });

    return history;
  }

  partOne() {
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

readInput("path", (err, data) => {
  if (err) console.log(err);

  const mirageMaintenance = new MirageMaintenance(data);

  const result = mirageMaintenance.partOne();

  console.log(result);
});
