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

    console.log(calculateMarginOfError());
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

function calculateMarginOfError() {
  let totalWaysToWin = 1;
  races.forEach((race) => {
    let time = race.time;
    let distance = race.recordDistance;

    let waysToWinThisRace = waysToWin(time, distance);

    totalWaysToWin *= waysToWinThisRace;
  });

  return totalWaysToWin;
}

function waysToWin(time, distance) {
  let waysToWin = 0;
  for (let i = 1; i < time; i++) {
    let remainingTime = time - i;
    let speed = i;

    if (remainingTime * speed > distance) {
      ++waysToWin;
    }
  }

  return waysToWin;
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day6/input.txt",
  (err, input) => {
    if (err) console.log(err);

    console.log(input);
  }
);
