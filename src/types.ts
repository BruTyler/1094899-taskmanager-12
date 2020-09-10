import {Color, UpdateType, FilterType} from './const';

export interface IRemoteStorage {
  getTasks(): Promise<Task[]>
  updateTask(task: Task): Promise<Task>
}

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
  // eslint-disable-next-line camelcase
  due_date: string | null,
  // eslint-disable-next-line camelcase
  repeating_days: RepeatingDays,
  // eslint-disable-next-line camelcase
  is_archived: boolean,
  // eslint-disable-next-line camelcase
  is_favorite: boolean,
}

export interface Filter {
  type: FilterType,
  title: string,
  count: number,
}

export type ObserverCb = (updateType?: UpdateType, payload?: any) => void;

export interface IObservable {
  addObserver: (observer: ObserverCb) => void;
  removeObserver: (observer: ObserverCb) => void;
  _notify: (updateType: UpdateType, payload?: any) => void;
}

export type Action = (arg1?: any, arg2?: any, arg3?: any) => void;

export interface StatisticData {
  tasks: Task[],
  dateFrom: Date,
  dateTo: Date
}
