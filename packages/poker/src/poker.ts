import shuffle from 'lodash.shuffle';
import { Card } from './card';
import { COUNT_BY_SUIT, Suit } from './constants';

export class Poker {
  readonly cards: Card[];

  constructor() {
    this.cards = this.generateCards();
  }

  /**
   * Generate all cards
   * @private
   */
  generateCards(): Card[] {
    const cards: Card[] = [];

    for (const suit of [Suit.spade, Suit.heart, Suit.club, Suit.diamond]) {
      for (let value = 1; value <= COUNT_BY_SUIT; value++) {
        cards.push(new Card(suit, value));
        // cards.push({
        //   suit: suit,
        //   value: value === 1 ? 14 : value,
        //   number: value + (suit - 1) * COUNT_BY_SUIT,
        // });
      }
    }

    cards.sort((a, b) => Number(`${a.value}${a.suit}`) - Number(`${b.value}${b.suit}`));

    return cards;
  }

  shuffle(): Card[] {
    return shuffle(this.cards);
  }
}
