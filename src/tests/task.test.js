import TaskView from '../view/task';
import {Color} from '../const';

it(`Task rendering`, () => {
  const task = {
    description: `some description`,
    dueDate: new Date(2020, 8, 4),
    repeatingMask: 0,
    color: Color.BLACK,
    isFavorite: true,
    isArchive: false,
  };

  const generatedTree = new TaskView(task).getTemplate();

  expect(generatedTree).toMatchSnapshot();
});
