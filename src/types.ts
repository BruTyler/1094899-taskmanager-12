import {Color} from "./const";

export type AnyType = string | number | boolean | symbol | undefined | void | null | Record<string, unknown>;

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
  repeatingDays: RepeatingDays,
  color: Color,
  isFavorite: boolean,
  isArchive: boolean,
}

export interface Filter {
  title: string,
  count: number,
}
