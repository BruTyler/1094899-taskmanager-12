function generateRandomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function pickRandomElement(array) {
  if (array === undefined || array === null || array.length === 0) {
    throw new Error(`Incorrect array`);
  }
  const randomIndex = generateRandomInt(0, array.length - 1);
  return array[randomIndex];
}

export function pickRandomBool() {
  return generateRandomInt(0, 1) === 1;
}

export function pickRandomDate() {
  if (pickRandomBool() === true) {
    return null;
  }

  const currentDate = new Date();
  const weakOffset = 1000 * 60 * 60 * 24 * 7;
  const minTime = currentDate.getTime() - weakOffset;
  const maxTime = currentDate.getTime() + weakOffset;
  const randomTime = generateRandomInt(minTime, maxTime);
  return new Date(randomTime);
}

