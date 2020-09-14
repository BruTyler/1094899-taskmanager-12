import {generateId} from '../mocks/task';
import TasksModel from '../model/tasks';
import {WithId, IClientStore, IRemoteStorage, Task as ITask} from '../types';

const getSyncedTasks = (items: any[]): ITask[] => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.task);
};

const createStoreStructure = (items: WithId<string>[]): Record<string, unknown> => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  private _api: IRemoteStorage
  private _store: IClientStore

  constructor(api: IRemoteStorage, store: IClientStore) {
    this._api = api;
    this._store = store;
  }

  getTasks(): Promise<ITask[]> {
    if (Provider.isOnline()) {
      return this._api.getTasks()
        .then((tasks) => {
          const items = createStoreStructure(tasks.map(TasksModel.adaptToServer));
          this._store.setItems(items);
          return tasks;
        });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(storeTasks.map(TasksModel.adaptToClient));
  }

  updateTask(task: ITask): Promise<ITask> {
    if (Provider.isOnline()) {
      return this._api.updateTask(task)
        .then((updatedTask) => {
          this._store.setItem(updatedTask.id, TasksModel.adaptToServer(updatedTask));
          return updatedTask;
        });
    }

    this._store.setItem(task.id, TasksModel.adaptToServer(Object.assign({}, task)));

    return Promise.resolve(task);
  }

  addTask(task: ITask): Promise<ITask> {
    if (Provider.isOnline()) {
      return this._api.addTask(task)
        .then((newTask) => {
          this._store.setItem(newTask.id, TasksModel.adaptToServer(newTask));
          return newTask;
        });
    }

    const localNewTaskId = generateId();
    const localNewTask = Object.assign({}, task, {id: localNewTaskId});

    this._store.setItem(localNewTask.id, TasksModel.adaptToServer(localNewTask));

    return Promise.resolve(localNewTask);
  }

  deleteTask(task: ITask): Promise<void> {
    if (Provider.isOnline()) {
      return this._api.deleteTask(task)
        .then(() => this._store.removeItem(task.id));
    }

    this._store.removeItem(task.id);

    return Promise.resolve();
  }

  sync(): Promise<void> {
    if (Provider.isOnline()) {
      const storeTasks = Object.values(this._store.getItems());

      return this._api.sync(storeTasks)
        .then((response) => {
          const createdTasks = getSyncedTasks(response.created);
          const updatedTasks = getSyncedTasks(response.updated);
          const items = createStoreStructure([...createdTasks, ...updatedTasks]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline(): boolean {
    return window.navigator.onLine;
  }
}
