const generateRandomInt = (min: number, max: number): number => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const pickRandomElement = <T extends any> (elements: Array<T>): T => {
  if (elements === undefined || elements === null || elements.length === 0) {
    throw new Error(`Incorrect array`);
  }
  const randomIndex = generateRandomInt(0, elements.length - 1);
  return elements[randomIndex];
};

export const pickRandomBool = (): boolean => {
  return Boolean(generateRandomInt(0, 1));
};

export const pickRandomDate = (): null | Date => {
  if (pickRandomBool() === true) {
    return null;
  }

  const dayOffset = 7;
  const randomDayOffset = generateRandomInt(-dayOffset, +dayOffset);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + randomDayOffset);

  return new Date(currentDate);
};

export const transformToStringId = (word: string): string => {
  return word.replace(/\s/g, `-`).toLowerCase();
};
