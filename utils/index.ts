export function includeString(first: string, second: string) {
  return first.toLowerCase().includes(second.toLowerCase());
}

export function isAnswerCorrect(first: string, second: string) {
  return simplifyString(first) === simplifyString(second);
}

const simplifyString = (str: string) => {
  return str.trim().toUpperCase().split("").sort().join("");
};

export function pickRandom<T>(arr: T[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function replaceAt(array: string[], index: number, value: string) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}
