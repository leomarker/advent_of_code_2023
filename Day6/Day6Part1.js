import fs from "fs";

let races = [];

function readInput(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      return cb(err);
    }

    let input = data.split("\n");

    cb(null, input);

    processInput(input);
  });
}

class Race {
  constructor(time, recordDistance) {
    this.time = time;
    this.recordDistance = recordDistance;
  }
}

function processInput(input) {
  let time;
  let distance;
  input.forEach((line) => {
    if (line.startsWith("Time")) {
      time = line
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((num) => num !== "");
    } else if (line.startsWith("Distance")) {
      distance = line
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((num) => num !== "");
    }
  });

  let race;

  time.forEach((time, index) => {
    race = new Race(time, distance[index]);
    races.push(race);
  });
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day6/input.txt",
  (err, input) => {
    if (err) console.log(err);

    console.log(input);
  }
);
