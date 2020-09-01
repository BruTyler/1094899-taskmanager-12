import {FilterType} from '../const';
import {isTaskExpired, isTaskExpiringToday} from './task';
import {isTaskRepeating} from './bitmap';
import {Task} from '../types';

export const filter = {
  [FilterType.ALL]: (tasks: Task[]): Task[] => tasks.filter((task) => !task.isArchive),
  [FilterType.OVERDUE]: (tasks: Task[]): Task[] => tasks.filter((task) => isTaskExpired(task.dueDate)),
  [FilterType.TODAY]: (tasks: Task[]): Task[] => tasks.filter((task) => isTaskExpiringToday(task.dueDate)),
  [FilterType.FAVORITES]: (tasks: Task[]): Task[] => tasks.filter((task) => task.isFavorite),
  [FilterType.REPEATING]: (tasks: Task[]): Task[] => tasks.filter((task) => isTaskRepeating(task.repeatingMask)),
  [FilterType.ARCHIVE]: (tasks: Task[]): Task[] => tasks.filter((task) => task.isArchive)
};
