import {Color, UpdateType} from './const';

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
  id: K | null,
}

export type Task = WithId<number> & {
  description: string,
  dueDate: Date | null,
  repeatingMask: number,
  color: Color,
  isFavorite: boolean,
  isArchive: boolean,
}

export type TaskServer = WithId<string> & {
  color: Color,
  description: string,
  due_date: string | null,
  repeating_days: RepeatingDays,
  is_archived: boolean,
  is_favorite: boolean,
}

export interface Filter {
  title: string,
  count: number,
}

export type ObserverCb = (updateType?: UpdateType, payload?: any) => void;

export interface IObservable {
  addObserver: (observer: ObserverCb) => void;
  removeObserver: (observer: ObserverCb) => void;
  _notify: (updateType: UpdateType, payload?: any) => void;
}
