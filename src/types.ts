import {Color} from './const';

export interface RepeatingDays {
  mo: boolean,
  tu: boolean,
  we: boolean,
  th: boolean,
  fr: boolean,
  sa: boolean,
  su: boolean
}

export interface WithId<K=string | number> {
  id: K,
}

export type Task = WithId<number> & {
  description: string,
  dueDate: Date | null,
  repeatingMask: number,
  color: Color,
  isFavorite: boolean,
  isArchive: boolean,
}

export interface Filter {
  title: string,
  count: number,
}

export type ObserverCb = (event: Event, payload?: Record<string, unknown>) => void;

export interface IObservable {
  addObserver: (observer: ObserverCb) => void;
  removeObserver: (observer: ObserverCb) => void;
  _notify: (event: Event, payload?: Record<string, unknown>) => void;
}
