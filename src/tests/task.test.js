import {createTaskTemplate} from '../view/task.js';
import {Color} from '../const.js';

it(`Task rendering`, () => {
  const task = {
    description: `some description`,
    dueDate: new Date(2020, 8, 4),
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    },
    color: Color.BLACK,
    isFavorite: true,
    isArchive: false,
  };

  const generatedBoard = createTaskTemplate(task);

  expect(generatedBoard).toMatchSnapshot();
});
