export const includeString = (first: string, second: string) => {
  return first.toLowerCase().includes(second.toLowerCase());
};

export const setButtonState = (isDisabled: boolean): string => {
  return isDisabled
    ? "bg-gray-700 cursor-not-allowed"
    : "bg-sky-700 cursor-pointer";
};
