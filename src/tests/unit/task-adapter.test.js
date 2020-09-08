/* eslint-disable camelcase */
import TasksModel from '../../model/tasks';
import {Color, RepeatingDaysMap} from '../../const';

const isoDate = `2019-07-19T09:52:05.173Z`;

const clientTask = {
  id: 0,
  color: Color.BLACK,
  description: `description`,
  dueDate: new Date(isoDate),
  repeatingMask: RepeatingDaysMap.mo + RepeatingDaysMap.su,
  isArchive: false,
  isFavorite: false
};

const serverTask = {
  id: `0`,
  color: Color.BLACK,
  description: `description`,
  due_date: isoDate,
  is_archived: false,
  is_favorite: false,
  repeating_days: {
    mo: true,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: true,
  }
};

describe(`Task adapter suit`, () => {
  it(`Adapter should convert task to client structure`, () => {
    const adaptedTask = TasksModel.adaptToClient(serverTask);
    expect(adaptedTask).toEqual(clientTask);
  });

  it(`Adapter should convert task to server structure`, () => {
    const adaptedTask = TasksModel.adaptToServer(clientTask);
    expect(adaptedTask).toEqual(serverTask);
  });
});
