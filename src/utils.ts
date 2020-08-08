const generateRandomInt = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const pickRandomElement = (array) => {
  if (array === undefined || array === null || array.length === 0) {
    throw new Error(`Incorrect array`);
  }
  const randomIndex = generateRandomInt(0, array.length - 1);
  return array[randomIndex];
};

export const pickRandomBool = () => {
  return Boolean(generateRandomInt(0, 1));
};

export const pickRandomDate = () => {
  if (pickRandomBool() === true) {
    return null;
  }

  const dayOffset = 7;
  const randomDayOffset = generateRandomInt(-dayOffset, +dayOffset);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + randomDayOffset);

  return new Date(currentDate);
};

export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return currentDate.getTime() > dueDate.getTime();
};

export const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return currentDate.toDateString() === dueDate.toDateString();
};

export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).includes(true);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

