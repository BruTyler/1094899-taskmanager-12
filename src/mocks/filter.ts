import {isTaskExpired, isTaskExpiringToday} from '../utils/task';
import {Task} from '../types';
import {isTaskRepeating} from '../utils/bitmap';

const taskToFilterMap = {
  all: (tasks: Array<Task>) => tasks.filter((task) => !task.isArchive).length,
  overdue: (tasks: Array<Task>) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isTaskExpired(task.dueDate)).length,
  today: (tasks: Array<Task>) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isTaskExpiringToday(task.dueDate)).length,
  favorites: (tasks: Array<Task>) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => task.isFavorite).length,
  repeating: (tasks: Array<Task>) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isTaskRepeating(task.repeatingMask)).length,
  archive: (tasks: Array<Task>) => tasks.filter((task) => task.isArchive).length,
};

export const generateFilter = (tasks: Task[]): Record<string, string | number>[] => {
  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) =>
    ({
      title: filterName,
      count: countTasks(tasks),
    })
  );
};
