import {Color, RepeatingDaysMap} from '../const';
import {pickRandomElement, pickRandomBool, pickRandomDate} from '../utils/common';
import {Task} from '../types';

const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const colors = Object.values(Color);

export const generateId = (): number => Date.now() + parseInt((Math.random() * 10000).toString(), 10);

const generateRepeatingDaysMask = (dueDate: null | Date): number => {
  const isSundayRepeating = dueDate !== null
    ? pickRandomBool()
    : false;

  return isSundayRepeating ? RepeatingDaysMap.su : 0;
};

export function generateRandomTask(): Task {
  const dueDate = pickRandomDate();

  const task = {
    id: generateId().toString(),
    description: pickRandomElement(descriptions),
    dueDate,
    repeatingMask: generateRepeatingDaysMask(dueDate),
    color: pickRandomElement(colors),
    isFavorite: pickRandomBool(),
    isArchive: pickRandomBool(),
  };

  return task;
}
