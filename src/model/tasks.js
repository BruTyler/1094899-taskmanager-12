/* eslint-disable camelcase */
import Observer from '../utils/observer';
import {convertRepeatingToMask, convertRepeatingToDays} from '../utils/bitmap';

export default class Tasks extends Observer {
  constructor() {
    super();
    this._tasks = [];
  }

  setTasks(tasks) {
    this._tasks = tasks.slice();
  }

  getTasks() {
    return this._tasks;
  }

  updateTask(updateType, update) {
    const index = this._tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._tasks = [
      ...this._tasks.slice(0, index),
      update,
      ...this._tasks.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addTask(updateType, update) {
    this._tasks = [
      update,
      ...this._tasks
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this._tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._tasks = [
      ...this._tasks.slice(0, index),
      ...this._tasks.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(task) {
    const {id, color, description, due_date, is_archived, is_favorite, repeating_days} = task;

    return {
      id,
      color,
      description,
      dueDate: due_date !== null ? new Date(due_date) : null,
      repeatingMask: convertRepeatingToMask(repeating_days),
      isArchive: is_archived,
      isFavorite: is_favorite,
    };
  }

  static adaptToServer(task) {
    const {id, color, description, dueDate, isArchive, isFavorite, repeatingMask} = task;

    return {
      id,
      color,
      description,
      due_date: dueDate instanceof Date ? task.dueDate.toISOString() : null,
      repeating_days: convertRepeatingToDays(repeatingMask),
      is_archived: isArchive,
      is_favorite: isFavorite,
    };
  }
}
