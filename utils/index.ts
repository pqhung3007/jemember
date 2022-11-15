export const includeString = (first: string, second: string) => {
  return first.toLowerCase().includes(second.toLowerCase());
};

export const compareString = (first: string, second: string) => {
  return first.toLowerCase().trim() === second.toLowerCase().trim();
};

export const getMultipleRandom = (arr: any[], num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

export const replaceAt = (array: any[], index: number, value: any) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};

export * from "./supabaseUtil";
