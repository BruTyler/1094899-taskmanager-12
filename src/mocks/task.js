import {Color} from '../const.ts';
import {pickRandomElement, pickRandomBool, pickRandomDate} from '../utils.js';

const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const colors = Object.values(Color);

const generateRepeatingDays = (dueDate) => {
  return {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: dueDate !== null
      ? pickRandomBool()
      : false
  };
};

export function generateRandomTask() {
  const dueDate = pickRandomDate();

  const task = {
    description: pickRandomElement(descriptions),
    dueDate,
    repeatingDays: generateRepeatingDays(dueDate),
    color: pickRandomElement(colors),
    isFavorite: pickRandomBool(),
    isArchive: pickRandomBool(),
  };

  return task;
}
