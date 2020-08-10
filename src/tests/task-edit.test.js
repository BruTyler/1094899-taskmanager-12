import TaskEditView from '../view/task-edit.js';
import {Color} from '../const.js';

it(`TaskEditor rendering`, () => {
  const task = {
    description: `some description1`,
    dueDate: new Date(2020, 8, 4),
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: true
    },
    color: Color.BLACK,
    isFavorite: true,
    isArchive: false,
  };

  const generatedTree = new TaskEditView(task).getTemplate();

  expect(generatedTree).toMatchSnapshot();
});
