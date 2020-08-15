import {RepeatingDays} from '../types';

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
