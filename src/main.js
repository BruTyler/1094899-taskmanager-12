import SiteMenuView from './view/site-menu';
import StatisticsView from './view/statistics.js';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import TasksModel from './model/tasks';
import FilterModel from './model/filter';
import {generateRandomTask} from './mocks/task';
import {render} from './utils/render';
import {RenderPosition, MenuItem, UpdateType, FilterType} from './const';

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateRandomTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuView();

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      // Скрыть статистику
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
// boardPresenter.init();
render(siteMainElement, new StatisticsView(tasksModel.getTasks()), RenderPosition.BEFOREEND);
