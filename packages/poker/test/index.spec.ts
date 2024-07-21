import { Card, Suit, ThreeCardBrag } from '../src';

const spadeA = new Card(Suit.spade, 1);
const spade2 = new Card(Suit.spade, 2);
const spade3 = new Card(Suit.spade, 3);
const spade4 = new Card(Suit.spade, 4);
const spade5 = new Card(Suit.spade, 5);
const spade6 = new Card(Suit.spade, 6);
const spade7 = new Card(Suit.spade, 7);
const spade8 = new Card(Suit.spade, 8);
const spade9 = new Card(Suit.spade, 9);
const spade10 = new Card(Suit.spade, 10);
const spadeJ = new Card(Suit.spade, 11);
const spadeQ = new Card(Suit.spade, 12);
const spadeK = new Card(Suit.spade, 13);

const heartA = new Card(Suit.heart, 1);
const heart2 = new Card(Suit.heart, 2);
const heart3 = new Card(Suit.heart, 3);
const heart4 = new Card(Suit.heart, 4);
const heart5 = new Card(Suit.heart, 5);
const heart6 = new Card(Suit.heart, 6);
const heart7 = new Card(Suit.heart, 7);
const heart8 = new Card(Suit.heart, 8);
const heart9 = new Card(Suit.heart, 9);
const heart10 = new Card(Suit.heart, 10);
const heartJ = new Card(Suit.heart, 11);
const heartQ = new Card(Suit.heart, 12);
const heartK = new Card(Suit.heart, 13);

const clubA = new Card(Suit.club, 1);
const club2 = new Card(Suit.club, 2);
const club3 = new Card(Suit.club, 3);
const club4 = new Card(Suit.club, 4);
const club5 = new Card(Suit.club, 5);
const club6 = new Card(Suit.club, 6);
const club7 = new Card(Suit.club, 7);
const club8 = new Card(Suit.club, 8);
const club9 = new Card(Suit.club, 9);
const club10 = new Card(Suit.club, 10);
const clubJ = new Card(Suit.club, 11);
const clubQ = new Card(Suit.club, 12);
const clubK = new Card(Suit.club, 13);

const diamondA = new Card(Suit.diamond, 1);
const diamond2 = new Card(Suit.diamond, 2);
const diamond3 = new Card(Suit.diamond, 3);
const diamond4 = new Card(Suit.diamond, 4);
const diamond5 = new Card(Suit.diamond, 5);
const diamond6 = new Card(Suit.diamond, 6);
const diamond7 = new Card(Suit.diamond, 7);
const diamond8 = new Card(Suit.diamond, 8);
const diamond9 = new Card(Suit.diamond, 9);
const diamond10 = new Card(Suit.diamond, 10);
const diamondJ = new Card(Suit.diamond, 11);
const diamondQ = new Card(Suit.diamond, 12);
const diamondK = new Card(Suit.diamond, 13);

if (ThreeCardBrag.from(spade2, heart2, club2).compareTo(ThreeCardBrag.from(spadeJ, spadeQ, spadeK))) {
  console.log('比较最小的炸弹>最大的顺金:✅  ');
} else {
  throw new Error('比较最小的炸弹>最大的顺金:❎  ');
}

if (ThreeCardBrag.from(spade2, spade3, spade4).compareTo(ThreeCardBrag.from(spadeA, spadeK, spadeJ))) {
  console.log('比较最小的顺金>最大的金花:✅  ');
} else {
  throw new Error('比较最小的顺金>最大的金花:❎  ');
}

if (ThreeCardBrag.from(spade2, spade3, spade5).compareTo(ThreeCardBrag.from(spadeA, spadeK, heartQ))) {
  console.log('比较最小的金花>最大的顺子:✅  ');
} else {
  throw new Error('比较最小的金花>最大的顺子:❎  ');
}

if (ThreeCardBrag.from(spade2, spade3, heart4).compareTo(ThreeCardBrag.from(spadeA, spadeK, heartA))) {
  console.log('比较最小的顺子>最大的对子:✅  ');
} else {
  throw new Error('比较最小的顺子>最大的对子:❎  ');
}

if (ThreeCardBrag.from(spade2, spade3, heart2).compareTo(ThreeCardBrag.from(spadeA, spadeK, heartJ))) {
  console.log('比较最小的对子>最大的高牌:✅  ');
} else {
  throw new Error('比较最小的对子>最大的高牌:❎  ');
}

if (ThreeCardBrag.from(spadeA, spadeK, spadeQ).compareTo(ThreeCardBrag.from(spadeA, spade3, spade2))) {
  console.log('比较顺金AKQ>顺金A32:✅  ');
} else {
  throw new Error('比较顺金AKQ>顺金A32:❎  ');
}

if (ThreeCardBrag.from(spadeA, spade3, spade2).compareTo(ThreeCardBrag.from(spadeJ, spadeK, spadeQ))) {
  console.log('比较顺金A32>顺金KQJ:✅  ');
} else {
  throw new Error('比较顺金A32>顺金KQJ:❎  ');
}

if (ThreeCardBrag.from(spadeA, spadeK, heartQ).compareTo(ThreeCardBrag.from(spadeA, spade3, heart2))) {
  console.log('比较顺子AKQ>顺子A32:✅  ');
} else {
  throw new Error('比较顺子AKQ>顺子A32:❎  ');
}

if (ThreeCardBrag.from(spadeA, spade3, heart2).compareTo(ThreeCardBrag.from(spadeJ, spadeK, heartQ))) {
  console.log('比较顺子A32>顺子KQJ:✅  ');
} else {
  throw new Error('比较顺子A32>顺子KQJ:❎  ');
}
