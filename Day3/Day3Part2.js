import fs from "fs";

let numbers = [];
let symbols = [];
class EngineNumber {
  constructor(value, from, to, line) {
    this.value = value;
    this.from = from;
    this.to = to;
    this.line = line;
  }

  hasSymbolInNeighbourhood(symbol) {
    return (
      Math.abs(this.line - symbol.line) <= 1 &&
      this.from - 1 <= symbol.index &&
      this.to + 1 >= symbol.index
    );
  }
}

class Symbol {
  constructor(line, index, value) {
    this.line = line;
    this.index = index;
    this.value = value;
  }

  numberOfNumberNeighbours() {
    return numbers.filter((number) => number.hasSymbolInNeighbourhood(this))
      .length;
  }

  isGear() {
    return this.value === "*" && this.numberOfNumberNeighbours() === 2;
  }

  getNeighboursProduct() {
    if (!this.isGear()) {
      return 0;
    }

    const neighbours = numbers.filter((number) =>
      number.hasSymbolInNeighbourhood(this)
    );

    return neighbours[0].value * neighbours[1].value;
  }
}

function readInput(path, cb) {
  let lines;
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      cb(err);
    }
    lines = data.split("\n");
    cb(null, lines);
  });
}

function getNumbers(lines) {
  lines.forEach((line, i) => {
    let j = 0;
    while (j < line.length) {
      if (!isNaN(line[j])) {
        let number = line[j];
        while (!isNaN(line[j + 1])) {
          number += line[j + 1];
          j++;
        }
        numbers.push(new EngineNumber(+number, j - number.length + 1, j, i));
      } else if (line[j] !== ".") {
        symbols.push(new Symbol(i, j, line[j]));
      }
      j++;
    }
  });
}

function sumNumbers(numbers) {
  const first = numbers
    .filter((number) =>
      symbols.some((symbol) => number.hasSymbolInNeighbourhood(symbol))
    )
    .reduce((acc, number) => acc + number.value, 0);

  return first;
}

function sumOfGears(symbols) {
  let sum = symbols.reduce(
    (acc, symbol) => acc + symbol.getNeighboursProduct(),
    0
  );

  return sum;
}
readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day3/input.txt",
  (err, result) => {
    if (err) {
      console.log(err);
    }

    getNumbers(result);

    let sum = sumNumbers(numbers);

    console.log(sum);

    let gears = sumOfGears(symbols);

    console.log(gears);
  }
);
