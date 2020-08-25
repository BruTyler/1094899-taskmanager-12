import {ObserverCb, IObservable} from '../types';

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

  _notify(event: Event, payload?: Record<string, unknown>): void {
    this._observers.forEach((observer) => observer(event, payload));
  }
}
