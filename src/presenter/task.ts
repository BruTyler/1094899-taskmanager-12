import TaskView from '../view/task';
import TaskEditView from '../view/task-edit';
import {render, replace, remove} from '../utils/render';
import {extend} from '../utils/common';
import {isTaskRepeating} from '../utils/bitmap';
import {isDatesEqual} from '../utils/task';
import {RenderPosition, UserAction, UpdateType, TaskMode, EditState} from '../const';
import {Action, Task as ITask} from '../types';
import AbstractView from '../view/abstract';

export default class Task {
  private _taskListContainer: HTMLElement | AbstractView
  private _changeData: Action
  private _changeMode: Action
  private _task: ITask
  private _taskComponent: TaskView | TaskEditView | null
  private _taskEditComponent: TaskEditView | null
  private _mode: TaskMode

  constructor(taskListContainer: HTMLElement | AbstractView, changeData: Action, changeMode: Action) {
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
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task: ITask): void {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._handleEditClick);
    this._taskComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._taskComponent.setArchiveClickHandler(this._handleArchiveClick);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._taskEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === TaskMode.DEFAULT) {
      replace(this._taskComponent, prevTaskComponent);
    }

    if (this._mode === TaskMode.EDITING) {
      replace(this._taskComponent, prevTaskEditComponent);
      this._mode = TaskMode.DEFAULT;
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy(): void {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }

  resetView(): void {
    if (this._mode !== TaskMode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  setViewState(state: EditState): void {
    const resetFormState = () => {
      this._taskEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case EditState.SAVING:
        this._taskEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case EditState.DELETING:
        this._taskEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case EditState.ABORTING:
        this._taskComponent.shake(resetFormState);
        this._taskEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm(): void {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = TaskMode.EDITING;
  }

  _replaceFormToCard(): void {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = TaskMode.DEFAULT;
  }

  _escKeyDownHandler(evt: KeyboardEvent): void {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._taskEditComponent.reset(this._task);
      this._replaceFormToCard();
    }
  }

  _handleEditClick(): void {
    this._replaceCardToForm();
  }

  _handleFavoriteClick(): void {
    const updatedProperty = {isFavorite: !this._task.isFavorite};
    const updatedTask = extend(this._task, updatedProperty);
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        updatedTask
    );
  }

  _handleArchiveClick(): void {
    const updatedProperty = {isArchive: !this._task.isArchive};
    const updatedTask = extend(this._task, updatedProperty);
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        updatedTask
    );
  }

  _handleFormSubmit(update: ITask): void {
    const isMinorUpdate =
      !isDatesEqual(this._task.dueDate, update.dueDate) ||
      isTaskRepeating(this._task.repeatingMask) !== isTaskRepeating(update.repeatingMask);
    this._changeData(
        UserAction.UPDATE_TASK,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );
  }

  _handleDeleteClick(task: ITask): void {
    this._changeData(
        UserAction.DELETE_TASK,
        UpdateType.MINOR,
        task
    );
  }
}
