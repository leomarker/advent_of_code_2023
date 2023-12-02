import fs from "fs";

function readInput(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      cb(err);
    }

    let games = data.split("\n");

    console.log(processGames(games));
  });
}

function processGames(games) {
  let total = 0;
  for (const game of games) {
    total = total + processGame(game);
  }

  return total;
}

function processGame(game, cb) {
  let gameInput = processGameInput(game);

  let result = isGamePossible(gameInput.setsOfGame);

  return result;
}

function processGameInput(game) {
  let gameID;
  let setsOfGame;
  let processedGame = game.split(":");

  gameID = processedGame[0];
  setsOfGame = processedGame[1].split(";");

  return {
    gameID: gameID,
    setsOfGame: setsOfGame,
  };
}

function isGamePossible(setsOfGame) {
  let isPossible = true;
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;

  for (const set of setsOfGame) {
    let cubes = set.split(",");

    for (const cube of cubes) {
      let numAndColor = cube.trim().split(" ");

      const result = checkCountOfCube(parseInt(numAndColor[0]), numAndColor[1]);

      if (result.color === "red" && result.num > maxRed) {
        maxRed = result.num;
      }

      if (result.color === "green" && result.num > maxGreen) {
        maxGreen = result.num;
      }

      if (result.color === "blue" && result.num > maxBlue) {
        maxBlue = result.num;
      }
    }
  }

  return maxBlue * maxRed * maxGreen;
}

function checkCountOfCube(num, color) {
  switch (color) {
    case "red":
      return {
        color: "red",
        num: num,
      };
    case "green":
      return {
        color: "green",
        num: num,
      };

    case "blue":
      return {
        color: "blue",
        num: num,
      };
  }
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day2/input.txt",
  (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log(result);
  }
);
