import Store from '../../api/store';

const SINGLE_STORAGE_KEY = `single-storage-key`;

class LocalStorageMock {
  constructor() {
    this._store = new Map();
  }

  getItem(key) {
    return this._store.get(key);
  }
  setItem(key, value) {
    this._store.set(key, value);
  }
}

describe(`API store suit`, () => {
  it(`Should init items`, () => {
    const localStorageMock = new LocalStorageMock();
    const apiStore = new Store(SINGLE_STORAGE_KEY, localStorageMock);

    apiStore.setItems({a: 1, b: 2});

    expect(localStorageMock.getItem(SINGLE_STORAGE_KEY)).toEqual(`{"a":1,"b":2}`);
  });

  it(`Should return existing items and convert them to object`, () => {
    const localStorageMock = new LocalStorageMock();
    localStorageMock.setItem(SINGLE_STORAGE_KEY, `{"a":1,"b":2}`);
    const apiStore = new Store(SINGLE_STORAGE_KEY, localStorageMock);

    const storeValue = apiStore.getItems();

    expect(storeValue).toEqual({a: 1, b: 2});
  });

  it(`Should add new item to existing items`, () => {
    const localStorageMock = new LocalStorageMock();
    localStorageMock.setItem(SINGLE_STORAGE_KEY, `{"a":1,"b":2}`);
    const apiStore = new Store(SINGLE_STORAGE_KEY, localStorageMock);

    apiStore.setItem(`c`, 3);

    expect(localStorageMock.getItem(SINGLE_STORAGE_KEY)).toEqual(`{"a":1,"b":2,"c":3}`);
  });

  it(`Should overwrite existing item with the same key`, () => {
    const localStorageMock = new LocalStorageMock();
    localStorageMock.setItem(SINGLE_STORAGE_KEY, `{"a":1,"b":2}`);
    const apiStore = new Store(SINGLE_STORAGE_KEY, localStorageMock);

    apiStore.setItem(`a`, 0);

    expect(localStorageMock.getItem(SINGLE_STORAGE_KEY)).toEqual(`{"a":0,"b":2}`);
  });

  it(`Should delete existing item by key`, () => {
    const localStorageMock = new LocalStorageMock();
    localStorageMock.setItem(SINGLE_STORAGE_KEY, `{"a":1,"b":2,"c":3}`);
    const apiStore = new Store(SINGLE_STORAGE_KEY, localStorageMock);

    apiStore.removeItem(`b`);

    expect(localStorageMock.getItem(SINGLE_STORAGE_KEY)).toEqual(`{"a":1,"c":3}`);
  });
});

