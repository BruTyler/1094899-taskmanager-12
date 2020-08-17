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

export interface Task {
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
