import SiteMenuView from './view/site-menu';
import FilterView from './view/filter';
import BoardPresenter from './presenter/board';
import TasksModel from './model/tasks';
import FilterModel from './model/filter';
import {generateRandomTask} from './mocks/task';
import {render} from './utils/render';
import {RenderPosition} from './const';

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateRandomTask);
const filters = [
  {
    type: `all`,
    title: `ALL`,
    count: 0
  }
];

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters, `all`), RenderPosition.BEFOREEND);

boardPresenter.init();
