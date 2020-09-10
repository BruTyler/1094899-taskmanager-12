/* eslint-disable camelcase */
import Observer from '../utils/observer';
import {convertRepeatingToMask, convertRepeatingToDays} from '../utils/bitmap';
import {Task, TaskServer} from '../types';
import {UpdateType} from '../const';

export default class Tasks extends Observer {
  private _tasks: Task[]

  constructor() {
    super();
    this._tasks = [];
  }

  setTasks(updateType: UpdateType, tasks: Task[]): void {
    this._tasks = tasks.slice();

    this._notify(updateType);
  }

  getTasks(): Task[] {
    return this._tasks;
  }

  updateTask(updateType: UpdateType, update: Task): void {
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

  addTask(updateType: UpdateType, update: Task): void {
    this._tasks = [
      update,
      ...this._tasks
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType: UpdateType, update: Task): void {
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

  static adaptToClient(task: TaskServer): Task {
    const {id, color, description, due_date, is_archived, is_favorite, repeating_days} = task;

    return {
      id: Number(id),
      color,
      description,
      dueDate: due_date !== null ? new Date(due_date) : null,
      repeatingMask: convertRepeatingToMask(repeating_days),
      isArchive: is_archived,
      isFavorite: is_favorite,
    };
  }

  static adaptToServer(task: Task): TaskServer {
    const {id = null, color, description, dueDate, isArchive, isFavorite, repeatingMask} = task;

    return {
      id: id !== null ? String(id) : null,
      color,
      description,
      due_date: dueDate instanceof Date ? task.dueDate.toISOString() : null,
      repeating_days: convertRepeatingToDays(repeatingMask),
      is_archived: isArchive,
      is_favorite: isFavorite,
    };
  }
}
