import { COUNT_BY_SUIT, Suit } from './constants';

// export interface Card {
//   // 花色
//   suit: Suit;
//   // A=1，将1替换为14方便比牌
//   value: number;
//   // 唯一，对应每张牌
//   number: number;
// }

export class Card {
  suit: Suit;
  value: number;
  number: number;

  /**
   * 创建卡牌对象
   * @param suit 花色
   * @param value - 牌值，为1~13的数字
   */
  constructor(suit: Suit, value: number) {
    if (value < 1 || value > COUNT_BY_SUIT) {
      throw new Error(`Invalid value: ${value}`);
    }

    // 花色
    this.suit = suit;
    // A=1，将1替换为14方便比牌
    this.value = value === 1 ? 14 : value;
    // 唯一，对应每张牌
    this.number = value + (suit - 1) * COUNT_BY_SUIT;
  }
}
