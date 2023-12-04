import fs from "fs";

let cards = [];
class Card {
  constructor(cardNumber, copies) {
    this.cardNumber = cardNumber;
    this.copies = copies;
  }
}

function readInput(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      return cb(err);
    }

    cb(null, data.split("\n"));
  });
}

function processInputs(inputs) {
  let totalCards = 0;

  inputs.forEach((input) => {
    let cardNumber = input
      .split(":")[0]
      .split(" ")
      .filter((num) => num !== "")[1];

    cards.push(new Card(cardNumber, 1));
  });

  inputs.forEach((input, index) => {
    let winnings = processInput(input);

    let start = index + 1;
    let end = index + winnings;
    let totalCopiesOfCard = cards[index].copies;

    for (let i = start; i <= end; i++) {
      cards[i].copies = cards[i].copies + totalCopiesOfCard;
    }
  });

  cards.forEach((card) => {
    totalCards += card.copies;
  });

  return totalCards;
}

function processInput(input) {
  let processed = input.split("|");

  let winningNumbers = processed[0].split(":")[1].trim().split(" ");
  let numbersIHave = processed[1]
    .trim()
    .split(" ")
    .filter((num) => num !== "");

  return howManyAreWinnings(winningNumbers, numbersIHave);
}

function howManyAreWinnings(winningNumbers, numbers) {
  let total = 0;

  winningNumbers.forEach((num) => {
    if (numbers.includes(num)) {
      total = total + 1;
    }
  });

  return total;
}

readInput(
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day4/input.txt",
  (err, input) => {
    if (err) console.log(err);

    let result = processInputs(input);

    console.log(result);
  }
);
