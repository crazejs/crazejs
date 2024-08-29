import { Card } from '../card';

/**
 * TODO: 未完成
 */
export class NiuNiu {
  static readonly COUNT_BY_HOLE_CARDS = 5;

  readonly cards: [Card, Card, Card, Card, Card];

  static from(...cards: Card[]) {
    return new this(...cards);
  }

  constructor(...cards: Card[]) {
    if (cards.length !== NiuNiu.COUNT_BY_HOLE_CARDS) {
      throw new Error('Invalid card length.');
    }

    this.cards = [cards[0]!, cards[1]!, cards[2]!, cards[3]!, cards[4]!];

    // sort by DESC
    this.cards.sort((a, b) => b.value - a.value);
  }
}
