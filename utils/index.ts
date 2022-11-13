export const includeString = (first: string, second: string) => {
  return first.toLowerCase().includes(second.toLowerCase());
};

export const setButtonState = (isDisabled: boolean): string => {
  return isDisabled
    ? "bg-neutral-700 cursor-not-allowed"
    : "bg-green-700 cursor-pointer";
};
