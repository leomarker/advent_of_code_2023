import fs from "fs";

function readInput(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      cb(err);
    }

    let games = data.split("\n");

    console.log(games);

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

  if (isGamePossible(gameInput.setsOfGame)) {
    return parseInt(gameInput.gameID.split(" ")[1]);
  }

  return 0;
}

function processGameInput(game) {
  let gameID;
  let setsOfGame;
  let processedGame = game.split(":");

  console.log(processedGame);

  gameID = processedGame[0];
  setsOfGame = processedGame[1].split(";");

  return {
    gameID: gameID,
    setsOfGame: setsOfGame,
  };
}

function isGamePossible(setsOfGame) {
  let isPossible = true;
  for (const set of setsOfGame) {
    let cubes = set.split(",");

    for (const cube of cubes) {
      let numAndColor = cube.trim().split(" ");

      if (!checkCountOfCube(parseInt(numAndColor[0]), numAndColor[1])) {
        isPossible = false;
      }
    }
  }

  return isPossible;
}

function checkCountOfCube(num, color) {
  switch (color) {
    case "red":
      if (num > 12) {
        return false;
      }
      return true;
    case "green":
      if (num > 13) {
        return false;
      }
      return true;

    case "blue":
      if (num > 14) {
        return false;
      }
      return true;
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
