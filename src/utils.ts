import {RepeatingDays, AnyType} from './types';
import {RenderPosition} from './const';

const generateRandomInt = (min: number, max: number): number => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const pickRandomElement = <T extends AnyType> (elements: Array<T>): T => {
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

export const isTaskExpired = (dueDate: null | Date): boolean => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return currentDate.getTime() > dueDate.getTime();
};

export const isTaskExpiringToday = (dueDate: null | Date): boolean => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return currentDate.toDateString() === dueDate.toDateString();
};

export const isTaskRepeating = (repeating: RepeatingDays): boolean => {
  return Object.values(repeating).includes(true);
};

export const humanizeTaskDueDate = (dueDate: Date): string => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

export const render = (container: HTMLElement, element: ChildNode, place: RenderPosition): void => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template: string): ChildNode => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
