export function includeString(first: string, second: string) {
  return first.toLowerCase().includes(second.toLowerCase());
}

export function compareString(first: string, second: string) {
  return first.toLowerCase().trim() === second.toLowerCase().trim();
}

export function pickRandom<T>(arr: T[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function replaceAt(array: string[], index: number, value: string) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}