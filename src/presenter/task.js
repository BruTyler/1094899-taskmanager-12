import TaskView from '../view/task';
import TaskEditView from '../view/task-edit';
import {render, replace, remove} from '../utils/render';
import {extend} from '../utils/common';
import {RenderPosition, UserAction, UpdateType, TaskMode} from '../const';

export default class Task {
  constructor(taskListContainer, changeData, changeMode) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._taskComponent = null;
    this._taskEditComponent = null;
    this._mode = TaskMode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleArchiveClick = this._handleArchiveClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._handleEditClick);
    this._taskComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._taskComponent.setArchiveClickHandler(this._handleArchiveClick);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === TaskMode.DEFAULT) {
      replace(this._taskComponent, prevTaskComponent);
    }

    if (this._mode === TaskMode.EDITING) {
      replace(this._taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }

  resetView() {
    if (this._mode !== TaskMode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = TaskMode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = TaskMode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._taskEditComponent.reset(this._task);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {

    const updatedProperty = {isFavorite: !this._task.isFavorite};
    const updatedTask = extend(this._task, updatedProperty);
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        updatedTask
    );
  }

  _handleArchiveClick() {
    const updatedProperty = {isArchive: !this._task.isArchive};
    const updatedTask = extend(this._task, updatedProperty);
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        updatedTask
    );
  }

  _handleFormSubmit(task) {
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        task
    );
    this._replaceFormToCard();
  }
}
