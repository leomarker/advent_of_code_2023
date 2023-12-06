import fs from "fs";

function readInput(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      return cb(err);
    }

    let input = data.split("\n");
    let map = "";

    let arr = input.reduce(
      (acc, line) => {
        if (line === "") {
          acc.arr.push(map);
          map = "";
        }
        map = map.concat(line, "\n");

        return acc;
      },
      { arr: [] }
    );

    cb(null, arr);
  });
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day5/input.txt",
  (err, input) => {
    if (err) console.log(err);

    console.log(input);
  }
);

// Havent done this will get back to it on the weekends
