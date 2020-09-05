import moment from 'moment';
import {Task} from '../types';

export const isTaskExpired = (dueDate: null | Date): boolean => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return moment(currentDate).isAfter(dueDate, `day`);
};

export const isTaskExpiringToday = (dueDate: null | Date): boolean => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return moment(dueDate).isSame(currentDate, `day`);
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

export const isDatesEqual = (dateA: Date | null, dateB: Date | null): boolean => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `day`);
};

export const getCurrentDate = (): Date => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return new Date(currentDate);
};
