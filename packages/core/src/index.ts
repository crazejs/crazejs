export function test(num: number, num2: number) {
  console.log('#test func:', num * num2);
  return num * num2;
}

export function test2(num: number, num2: number) {
  console.log('#test func:', num + num2);
  return num + num2;
}

console.log(test(1, 2));
console.log('done.');
