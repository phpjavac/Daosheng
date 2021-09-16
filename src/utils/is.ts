const { toString } = Object.prototype;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}
