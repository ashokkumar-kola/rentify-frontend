export const toggleItemInArray = (array: string[], item: string): string[] => {
  return array.includes(item)
    ? array.filter(i => i !== item)
    : [...array, item];
};