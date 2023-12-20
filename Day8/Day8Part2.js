import fs from "fs";

class HauntedWasteland {
  constructor(input) {
    this.input = this.parseInput(input);
  }

  parseInput(input) {
    const networkList = {};
    const inputList = input.split("\n");
    const instructions = inputList[0];
    let start;
    const networks = inputList.filter(
      (line) => line !== instructions && line !== ""
    );
    networks.forEach((element, index) => {
      const [key, directions] = element.split("=").map((item) => item.trim());

      if (index === 0) {
        start = key;
      }
      const [L, R] = directions.replace("(", "").replace(")", "").split(",");
      networkList[`${key}`] = { L, R };
    });

    return { instructions, start, networkList };
  }

  partOne() {
    let count = 0;
    let current;
    let networks = this.input.networkList;

    let instructions = Array.from(this.input.instructions);

    let x = Object.keys(networks)
      .filter((id) => id.endsWith("A"))
      .reduce((obj, key) => {
        obj[key] = networks[key];
        return obj;
      }, {});

    console.log(x);

    let result = Object.keys(x).forEach((node) => {
      while (!node.endsWith("Z")) {
        let direction = instructions.shift();
        let newCurrent;
        if (direction === "R") {
          newCurrent = networks[`${node}`].R;
        } else if (direction === "L") {
          newCurrent = networks[`${node}`].L;
        }
        current = newCurrent.trim();

        if (current.endsWith("Z")) break;

        ++count;
        instructions.push(direction);
      }
    });

    return result;
  }

  partTwo() {}
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
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day8/input.txt",
  (err, data) => {
    if (err) console.log(err);

    const hauntedWasteland = new HauntedWasteland(data);

    let result = hauntedWasteland.partOne();

    console.log(result);
  }
);
