import {Color} from '../const.js';
import {pickRandomElement, pickRandomBool, pickRandomDate} from '../utils.js';

const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const colors = Object.values(Color);

export function generateRandomTask() {
  const task = {
    description: pickRandomElement(descriptions),
    dueDate: pickRandomDate(),
    repeatingDays: {
      mo: pickRandomBool(),
      tu: pickRandomBool(),
      we: pickRandomBool(),
      th: pickRandomBool(),
      fr: pickRandomBool(),
      sa: pickRandomBool(),
      su: pickRandomBool()
    },
    color: pickRandomElement(colors),
    isFavorite: pickRandomBool(),
    isArchive: pickRandomBool(),
  };

  return task;
}
