import {ObserverCb, IObservable} from '../types';
import {UpdateType} from '../const';

export default class Observer implements IObservable {
  private _observers: ObserverCb[];

  constructor() {
    this._observers = [];
  }

  addObserver(observer: ObserverCb): void {
    this._observers.push(observer);
  }

  removeObserver(observer: ObserverCb): void {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(updateType: UpdateType, payload?: any): void {
    this._observers.forEach((observer) => observer(updateType, payload));
  }
}
