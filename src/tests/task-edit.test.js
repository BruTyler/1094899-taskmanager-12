import TaskEditView from '../view/task-edit';
import {Color, RepeatingDaysMap} from '../const';

it(`TaskEditor rendering`, () => {
  const task = {
    id: `123`,
    description: `some description1`,
    dueDate: new Date(2020, 8, 4),
    repeatingMask: RepeatingDaysMap.su,
    color: Color.BLACK,
    isFavorite: true,
    isArchive: false,
  };

  const generatedTree = new TaskEditView(task).getTemplate();

  expect(generatedTree).toMatchSnapshot();
});
