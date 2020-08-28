import BoardPresenter from '../presenter/board';
import TasksModel from '../model/tasks';
import {Color} from '../const';
import {createElement} from '../utils/render';

it(`Board-Presenter rendering`, () => {
  const task = {
    id: `123`,
    description: `some description`,
    dueDate: new Date(2020, 8, 4),
    repeatingMask: 0,
    color: Color.BLACK,
    isFavorite: true,
    isArchive: false,
  };

  const tasks = new Array(10).fill(task);
  const containerElement = createElement(`<div id="container-template"></div>`);

  const tasksModel = new TasksModel();
  tasksModel.setTasks(tasks);

  const boardPresenter = new BoardPresenter(containerElement, tasksModel);
  boardPresenter.init();

  expect(containerElement).toMatchSnapshot();
});
