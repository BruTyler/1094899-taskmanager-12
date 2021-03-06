import BoardView from '../view/board';
import TaskNewPresenter from './task-new';
import SortView from '../view/sort';
import TaskListView from '../view/task-list';
import LoadingView from '../view/loading';
import NoTaskView from '../view/no-task';
import LoadMoreButtonView from '../view/load-more-button';
import TaskPresenter from './task';
import {render, remove} from '../utils/render';
import {RenderPosition, SortType, UpdateType, UserAction, EditState} from '../const';
import {sortTaskUp, sortTaskDown} from '../utils/task';
import {filter} from '../utils/filter';
import TasksModel from '../model/tasks';
import FilterModel from '../model/filter';
import AbstractView from '../view/abstract';
import {IRemoteStorage, Action, Task} from '../types';

const TASK_COUNT_PER_STEP = 8;

export default class Board {
  private _tasksModel: TasksModel
  private _filterModel: FilterModel
  private _boardContainer: HTMLElement
  private _renderedTaskCount: number
  private _currentSortType: SortType
  private _taskPresenter: Record<number, TaskPresenter>
  private _taskNewPresenter: TaskNewPresenter
  private _isLoading: boolean
  private _api: IRemoteStorage
  private _sortComponent: SortView | null
  private _loadMoreButtonComponent: LoadMoreButtonView | null
  private _boardComponent: BoardView | null
  private _taskListComponent: AbstractView
  private _noTaskComponent: AbstractView
  private _loadingComponent: AbstractView

  constructor(boardContainer: HTMLElement, tasksModel: TasksModel, filterModel: FilterModel, api: IRemoteStorage) {
    this._tasksModel = tasksModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._taskPresenter = {};
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._boardComponent = new BoardView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._taskNewPresenter = new TaskNewPresenter(this._taskListComponent, this._handleViewAction);
  }

  init(): void {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy(): void {
    this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});

    remove(this._taskListComponent);
    remove(this._boardComponent);

    this._tasksModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createTask(callback: Action): void {
    this._taskNewPresenter.init(callback);
  }

  _getTasks(): Task[] {
    const filterType = this._filterModel.getFilter();
    const tasks = this._tasksModel.getTasks();
    const filtredTasks = filter[filterType](tasks);

    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filtredTasks.sort(sortTaskUp);
      case SortType.DATE_DOWN:
        return filtredTasks.sort(sortTaskDown);
    }

    return filtredTasks;
  }

  _handleModeChange(): void {
    this._taskNewPresenter.destroy();
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType: UserAction, updateType: UpdateType, update: Task): void {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._taskPresenter[update.id].setViewState(EditState.SAVING);
        this._api.updateTask(update)
          .then((response) => {
            this._tasksModel.updateTask(updateType, response);
          })
          .catch(() => {
            this._taskPresenter[update.id].setViewState(EditState.ABORTING);
          });
        break;
      case UserAction.ADD_TASK:
        this._taskNewPresenter.setSaving();
        this._api.addTask(update)
          .then((response) => {
            this._tasksModel.addTask(updateType, response);
          })
          .catch(() => {
            this._taskPresenter[update.id].setViewState(EditState.ABORTING);
          });
        break;
      case UserAction.DELETE_TASK:
        this._taskPresenter[update.id].setViewState(EditState.DELETING);
        this._api.deleteTask(update)
          .then(() => {
            this._tasksModel.deleteTask(updateType, update);
          })
          .catch(() => {
            this._taskPresenter[update.id].setViewState(EditState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType: UpdateType, data: Task): void {
    switch (updateType) {
      case UpdateType.PATCH:
        this._taskPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType: SortType): void {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _renderSort(): void {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTask(task: Task): void {
    const taskPresenter = new TaskPresenter(this._taskListComponent, this._handleViewAction, this._handleModeChange);
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
  }

  _renderTasks(tasks: Task[]): void {
    tasks.forEach((task) => this._renderTask(task));
  }

  _renderLoading(): void {
    render(this._boardComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoTasks(): void {
    render(this._boardComponent, this._noTaskComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick(): void {
    const taskCount = this._getTasks().length;
    const newRenderedTaskCount = Math.min(taskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);

    const tasks = this._getTasks().slice(this._renderedTaskCount, newRenderedTaskCount);

    this._renderTasks(tasks);
    this._renderedTaskCount = newRenderedTaskCount;

    if (this._renderedTaskCount >= taskCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton(): void {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);

    render(this._boardComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard(clearSetting?: Record<string, boolean>): void {
    const resetRenderedTaskCount = clearSetting?.resetRenderedTaskCount || false;
    const resetSortType = clearSetting?.resetSortType || false;

    const taskCount = this._getTasks().length;

    this._taskNewPresenter.destroy();
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};

    remove(this._sortComponent);
    remove(this._noTaskComponent);
    remove(this._loadMoreButtonComponent);
    remove(this._loadingComponent);

    if (resetRenderedTaskCount) {
      this._renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      this._renderedTaskCount = Math.min(taskCount, this._renderedTaskCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard(): void {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const tasks = this._getTasks();

    const taskCount = tasks.length;

    if (taskCount === 0) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();
    this._renderTasks(tasks.slice(0, Math.min(taskCount, this._renderedTaskCount)));

    if (taskCount > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }
}
