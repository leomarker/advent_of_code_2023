import fs from "fs";

class CamelCards {
  constructor(input) {
    this.input = this.parseInput(input);
  }

  parseInput(input) {
    let scoreLists = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };

    const inputList = input.split("\n").map((line) => {
      const [card, bet] = line.split(" ");
      const cards = card.split("");
      const type = this.typeOfHand(cards);
      const handData = { cards: cards, bet, type };
      scoreLists[type].push(handData);
      return handData;
    });

    Object.keys(scoreLists).forEach((id) => {
      scoreLists[id].sort((a, b) => this.getRank(a.cards, b.cards));
    });

    return { scoreLists, inputList };
  }

  partOne() {
    let sum = 0;
    const rankedList = [
      ...this.input.scoreLists[1],
      ...this.input.scoreLists[2],
      ...this.input.scoreLists[3],
      ...this.input.scoreLists[4],
      ...this.input.scoreLists[5],
      ...this.input.scoreLists[6],
      ...this.input.scoreLists[7],
    ];

    for (let i = 0; i < rankedList.length; i++) {
      sum = sum + rankedList[i].bet * (i + 1);
    }
    return sum;
  }

  typeOfHand(hand) {
    const cards = new Set(hand);
    let maxCount = 0;

    switch (cards.size) {
      case 5:
        return 1;
      case 4:
        return 2;
      case 3:
        for (const card of hand) {
          const countKind = hand.filter((char) => char === card);

          if (countKind.length > maxCount) maxCount = countKind.length;
        }

        return maxCount === 2 ? 3 : 4;
      case 2:
        for (const card of hand) {
          const countKind = hand.filter((char) => char === card);
          if (countKind.length > maxCount) maxCount = countKind.length;
        }

        return maxCount === 3 ? 5 : 6;
      case 1:
        return 7;
    }
  }

  getRank(hand1, hand2) {
    for (let i = 0; i < 5; i++) {
      if (hand1[i] !== hand2[i]) {
        return this.cardMap[hand1[i]] - this.cardMap[hand2[i]];
      }
    }
  }

  cardMap = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    T: 9,
    J: 10,
    Q: 11,
    K: 12,
    A: 13,
  };
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
  "/home/nati/learn/AdventofCode/advent_of_code_2023/Day7/input.txt",
  (err, data) => {
    if (err) console.log(err);
    let result = new CamelCards(data);

    let sum = result.partOne();

    console.log(sum);
  }
);
