import TaskEditView from '../view/task-edit';
import AbstractView from '../view/abstract';
import {remove, render} from '../utils/render';
import {UserAction, UpdateType, RenderPosition} from '../const';
import {Action, Task} from '../types';

export default class TaskNew {
  private _taskListContainer: HTMLElement | AbstractView
  private _changeData: Action
  private _taskEditComponent: TaskEditView | null
  private _destroyCallback: Action | null

  constructor(taskListContainer: HTMLElement | AbstractView, changeData: Action) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;

    this._taskEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback: Action): void {
    this._destroyCallback = callback;

    if (this._taskEditComponent !== null) {
      return;
    }

    this._taskEditComponent = new TaskEditView();
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._taskEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._taskListContainer, this._taskEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy(): void {
    if (this._taskEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._taskEditComponent);
    this._taskEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving(): void {
    this._taskEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  _handleFormSubmit(task: Task): void {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MINOR,
        task
    );
  }

  _handleDeleteClick(): void {
    this.destroy();
  }

  _escKeyDownHandler(evt: KeyboardEvent): void {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
