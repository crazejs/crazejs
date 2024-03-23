import { Card } from '../card';

export const COUNT_BY_HOLE_CARDS: number = 3;

export enum CardType {
  // 炸弹
  BOMB = 5,
  // 同花顺，A32也是顺子
  STRAIGHT_FLUSH = 4,
  // 同花
  FLUSH = 3,
  // 顺子，A32也是顺子
  STRAIGHT = 2,
  // 对子
  PAIR = 1,
  // 普通牌，里面包含一种特殊牌532不同花色
  NORMAL = 0,
  // 特殊牌
  SPECIAL = 6,
}

export enum CardRadix {
  // 最大值AAA=14，加上同花顺6867=7881
  BOMB_MAX_VALUE = 7881,
  // 最大值AKQ=12，加上同花7855=7867
  STRAIGHT_FLUSH_MAX_VALUE = 7867,
  // 最大值AKJ，14*16*16+13*16+11=3803，加上顺子4052=7855
  FLUSH_MAX_VALUE = 7855,
  // 最大值AKQ=12，加上对子的最大值基数4040=4052
  STRAIGHT_MAX_VALUE = 4052,
  // 最大值AAK=14*16+13=237,加上普通牌的基数3803=4040
  PAIR_MAX_VALUE = 4040,
  // 最大值AKJ=14*16*16+13*16+11=3803
  NORMAL_MAX_VALUE = 3803,
}

/**
 * 检查是否是同花
 * @param cards
 */
function isFlush(cards: [Card, Card, Card]) {
  return cards[0].suit === cards[1].suit && cards[1].suit === cards[2].suit;
}

/**
 * 检查是否是A23
 * @param cards
 */
function isA23(cards: [Card, Card, Card]) {
  return cards[0].value === 14 && cards[1].value === 3 && cards[2].value === 2;
}

/**
 * 检查是否是顺子
 * @param cards
 */
function isStraight(cards: [Card, Card, Card]) {
  // 第一位减1 和 第三位加1 等于 第二位
  const start = cards[0].value - 1;
  const end = cards[2].value + 1;
  return start === cards[1].value && cards[1].value === end;
}

/**
 * 检查是否是对子
 * @param cards
 */
function isPair(cards: [Card, Card, Card]) {
  return cards[0].value === cards[1].value || cards[1].value === cards[2].value;
}

/**
 * 检查是否是豹子
 * @param cards
 */
function isBomb(cards: [Card, Card, Card]) {
  return cards[0].value === cards[1].value && cards[1].value === cards[2].value;
}

/**
 * 检查是否是235
 * @param cards
 */
function isSpecial235(cards: [Card, Card, Card]) {
  return cards[0].value === 5 && cards[1].value === 3 && cards[2].value === 2;
}

/**
 * 获取炸弹牌值绝对大小
 * @param cards
 */
function getBombValue(cards: [Card, Card, Card]) {
  return (cards[0].value + CardRadix.STRAIGHT_FLUSH_MAX_VALUE) * 64;
}

/**
 * 获取同花顺牌值绝对大小，A32也是同花顺
 * @param cards
 */
function getStraightFlushValue(cards: [Card, Card, Card]) {
  return (cards[2].value + CardRadix.FLUSH_MAX_VALUE) * 64;
}

/**
 * 获取同花牌值绝对大小
 * @param cards
 */
function getFlushValue(cards: [Card, Card, Card]) {
  return (cards[0].value * 256 + cards[1].value * 16 + cards[2].value + CardRadix.STRAIGHT_MAX_VALUE) * 64;
}

/**
 * 获取顺子牌值绝对大小
 * @param cards
 */
function getStraightValue(cards: [Card, Card, Card]) {
  return (cards[2].value + CardRadix.PAIR_MAX_VALUE) * 64;
}

/**
 * 获取对子牌值绝对大小
 * @param cards
 */
function getPairValue(cards: [Card, Card, Card]) {
  let n = cards[0].value;
  if (cards[1].value === cards[0].value) {
    n = cards[2].value;
  }
  return (cards[1].value * 16 + n + CardRadix.NORMAL_MAX_VALUE) * 64;
}

/**
 * 获取普通牌值绝对大小
 * @param cards
 */
function getNormalValue(cards: [Card, Card, Card]) {
  return (cards[0].value * 256 + cards[1].value * 16 + cards[2].value) * 64;
}

/**
 * 获取牌型
 * @param isFlush
 * @param isStraight
 * @param isPair
 * @param isBomb
 * @param isSpecial235
 */
function getCardType({
  isFlush,
  isStraight,
  isPair,
  isBomb,
  isSpecial235,
}: {
  isFlush: boolean;
  isStraight: boolean;
  isPair: boolean;
  isBomb: boolean;
  isSpecial235: boolean;
}) {
  // 普通牌/特殊牌
  let cardType = isSpecial235 ? CardType.SPECIAL : CardType.NORMAL;

  // 同花
  if (isFlush) {
    cardType = CardType.FLUSH;

    // 同花顺
    if (isStraight) {
      cardType = CardType.STRAIGHT_FLUSH;
    }
  }

  // 顺子
  if (isStraight) {
    cardType = CardType.STRAIGHT;
  }

  // 对子
  if (isPair) {
    cardType = CardType.PAIR;

    // 炸弹
    if (isBomb) {
      cardType = CardType.BOMB;
    }
  }

  return cardType;
}

/**
 * 计算牌型分数
 * @param cards
 * @param cardType
 */
function calcCardScore(cards: [Card, Card, Card], cardType: CardType) {
  let cardScore = 0;

  switch (cardType) {
    case CardType.FLUSH: {
      cardScore = getFlushValue(cards);
      break;
    }
    case CardType.STRAIGHT: {
      cardScore = getStraightValue(cards);
      break;
    }
    case CardType.STRAIGHT_FLUSH: {
      cardScore = getStraightFlushValue(cards);
      break;
    }
    case CardType.PAIR: {
      cardScore = getPairValue(cards);
      break;
    }
    case CardType.BOMB: {
      cardScore = getBombValue(cards);
      break;
    }
    case CardType.SPECIAL:
    case CardType.NORMAL:
    default: {
      cardScore = getNormalValue(cards);
      break;
    }
  }

  return cardScore;
}

export class ThreeCardBrag {
  readonly cards: [Card, Card, Card];

  readonly cardType: CardType = CardType.NORMAL;

  readonly cardScore: number = 0;

  private readonly flush: boolean = false;
  private readonly straight: boolean = false;
  private readonly pair: boolean = false;
  private readonly bomb: boolean = false;
  private readonly A23: boolean = false;
  private readonly special235: boolean = false;

  constructor(...cards: Card[]) {
    if (cards.length !== COUNT_BY_HOLE_CARDS) {
      throw new Error('Invalid card length.');
    }

    this.cards = [cards[0]!, cards[1]!, cards[2]!];

    // sort by DESC
    this.cards.sort((a, b) => b.value - a.value);

    // check card type and score
    this.flush = isFlush(this.cards);
    this.A23 = isA23(this.cards);
    this.straight = isStraight(this.cards) || this.A23;
    this.pair = isPair(this.cards);
    this.bomb = isBomb(this.cards);
    this.special235 = isSpecial235(this.cards);
    this.cardType = getCardType({
      isFlush: this.flush,
      isStraight: this.straight,
      isPair: this.pair,
      isBomb: this.bomb,
      isSpecial235: this.special235,
    });
    this.cardScore = calcCardScore(this.cards, this.cardType) + this.flowerValue;
  }

  /**
   * 比牌
   * @param to
   */
  compareTo(to: ThreeCardBrag) {
    if (this.cardType === CardType.SPECIAL && to.cardType === CardType.BOMB) {
      return true;
    }

    if (to.cardType === CardType.SPECIAL && this.cardType === CardType.BOMB) {
      return false;
    }

    return this.cardScore > to.cardScore;
  }

  /**
   * 花色参与比较(暂不支持)
   */
  private get flowerValue() {
    return this.cards[0].suit * 16 + this.cards[1].suit * 4 + this.cards[2].suit;
  }
}
