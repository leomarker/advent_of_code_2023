import fs from "fs";

class CamelCards {
  constructor(input) {
    this.input = this.parseInput(input);
  }

  parseInput(input) {
    const scoreLists = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
    const inputList = input.split("\n").map((line) => {
      const [cards, bet] = line.split(" ");
      const cardArray = cards.split("");
      const score = this.typeOfHand(cardArray);
      const cardData = { cards: cardArray, bet, score };
      scoreLists[score].push(cardData);
      return cardData;
    });
    Object.keys(scoreLists).forEach((id) =>
      scoreLists[id].sort((a, b) => this.breakTieJoker(a.cards, b.cards))
    );
    return { scoreLists, inputList };
  }

  partTwo() {
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
    if (cards.has("J")) return this.scoreJokerHand(hand);
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

  scoreJokerHand(hand) {
    const jokerCount = hand.filter((hc) => hc === "J").length;
    const cards = new Set(hand);
    let maxCount = 0;
    switch (jokerCount) {
      case 5:
      case 4:
        return 7;
      case 3:
        return cards.size === 3 ? 6 : 7;
      case 2:
        if (cards.size === 4) return 4;
        if (cards.size === 3) return 6;
        if (cards.size === 2) return 7;
      case 1:
        if (cards.size === 5) return 2;
        if (cards.size === 4) return 4;
        if (cards.size === 3) {
          for (const card of cards) {
            const cardCount = hand.filter((hc) => hc === card);
            if (cardCount.length > maxCount) maxCount = cardCount.length;
          }
          return maxCount === 2 ? 5 : 6;
        }
        if (cards.size === 2) {
          return 7;
        }
    }
  }

  getRank(hand1, hand2) {
    for (let i = 0; i < 5; i++) {
      if (hand1[i] !== hand2[i]) {
        return this.cardMap[hand1[i]] - this.cardMap[hand2[i]];
      }
    }
  }

  breakTieJoker(handOne, handTwo) {
    for (let i = 0; i < 5; i++) {
      if (handOne[i] !== handTwo[i]) {
        return this.cardMapTwo[handOne[i]] - this.cardMapTwo[handTwo[i]];
      }
    }
    return 0;
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

  cardMapTwo = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 1,
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

    let sum = result.partTwo();

    console.log(sum);
  }
);
