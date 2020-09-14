import BoardPresenter from '../../presenter/board';
import TasksModel from '../../model/tasks';
import {Color, FilterType, UpdateType} from '../../const';
import {createElement} from '../../utils/render';

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

  const filterModelMock = {
    getFilter: () => FilterType.ALL,
    addObserver: () => null
  };

  const boardPresenter = new BoardPresenter(containerElement, tasksModel, filterModelMock);
  boardPresenter.init();
  tasksModel.setTasks(UpdateType.INIT, tasks);

  expect(containerElement).toMatchSnapshot();
});
