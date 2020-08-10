import {Color} from '../const';
import {pickRandomElement, pickRandomBool, pickRandomDate} from '../utils';
import {RepeatingDays, Task} from '../types';

const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const colors = Object.values(Color);

const generateRepeatingDays = (dueDate: null | Date): RepeatingDays => {
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

export function generateRandomTask(): Task {
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
