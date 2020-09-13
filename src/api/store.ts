import {IBrowserStorage, Task as ITask} from '../types';


export default class Store {
  private _storage: IBrowserStorage
  private _storeKey: string

  constructor(key: string, storage: IBrowserStorage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems(): Record<string, any> {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items: Record<string, unknown>): void {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  setItem(key: string, value: unknown): void {
    const store = this.getItems();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeItem(key: string): void {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }
}
