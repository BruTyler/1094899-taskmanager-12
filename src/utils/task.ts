import moment from 'moment';
import {Task} from '../types';

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

export const humanizeTaskDueDate = (dueDate: Date): string => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }

  return moment(dueDate).format(`D MMMM`);
};

const getWeightForNullDate = (dateA: Date | null, dateB: Date | null): number | null => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTaskUp = (taskA: Task, taskB: Task): number => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskA.dueDate.getTime() - taskB.dueDate.getTime();
};

export const sortTaskDown = (taskA: Task, taskB: Task): number => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.dueDate.getTime() - taskA.dueDate.getTime();
};
