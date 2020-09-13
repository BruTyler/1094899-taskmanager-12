import flatpickr from 'flatpickr';
import {Instance as Iflatpickr} from 'flatpickr/dist/types/instance';
import he from 'he';
import SmartView from './smart';
import {Color} from '../const';
import {isTaskExpired, humanizeTaskDueDate} from '../utils/task';
import {getRepeatingDayNames, isTaskRepeating, isDayRepeating, updateRepeatingMask} from '../utils/bitmap';
import {Task, Action} from '../types';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_TASK = {
  id: null,
  color: Color.BLACK,
  description: ``,
  dueDate: null,
  repeatingMask: 0,
  isArchive: false,
  isFavorite: false
};

const createTaskEditDateTemplate = (dueDate: Date | null, isDueDate: boolean, isDisabled: boolean): string => {
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${isDueDate ? `yes` : `no`}</span>
    </button>
    ${isDueDate ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${humanizeTaskDueDate(dueDate)}"
          ${isDisabled ? `disabled` : ``}
        />
      </label>
    </fieldset>` : ``}
  `;
};

const createTaskEditRepeatingTemplate = (repeatingMask: number, isRepeating: boolean, isDisabled: boolean): string => {
  const repeatingDayNames = getRepeatingDayNames();

  return `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
  </button>
  ${isRepeating
    ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${repeatingDayNames.map((day) =>`<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}"
            name="repeat"
            value="${day}"
            ${isDayRepeating(repeatingMask, day) ? `checked` : ``}
            ${isDisabled ? `disabled` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}"
            >${day}</label
          >`).join(``)}
        </div>
      </fieldset>`
    : ``}`;
};

const createTaskEditColorsTemplate = (currentColor: Color): string => {
  return Object.values(Color).map((color) => `<input
    type="radio"
    id="color-${color}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${currentColor === color ? `checked` : ``}
  />
  <label
    for="color-${color}"
    class="card__color card__color--${color}"
    >${color}</label
  >`).join(``);
};

const createTaskEditTemplate = (data: Record<string, any>) => {
  const {color, description, dueDate, repeatingMask, isDueDate,
    isRepeating, isDisabled, isSaving, isDeleting
  } = data;

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;
  const dateTemplate = createTaskEditDateTemplate(dueDate, isDueDate, isDisabled);

  const repeatingClassName = isRepeating
    ? `card--repeat`
    : ``;
  const repeatingTemplate = createTaskEditRepeatingTemplate(repeatingMask, isRepeating, isDisabled);

  const colorsTemplate = createTaskEditColorsTemplate(color);

  const isSubmitDisabled = (isDueDate && dueDate === null) || (isRepeating && !isTaskRepeating(repeatingMask));

  return `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
              ${isDisabled ? `disabled` : ``}
            >${he.encode(description)}</textarea>
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              ${dateTemplate}
              ${repeatingTemplate}
            </div>
          </div>
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colorsTemplate}
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          <button class="card__save" type="submit" ${isSubmitDisabled || isDisabled ? `disabled` : ``}>
            ${isSaving ? `saving...` : `save`}
          </button>
          <button class="card__delete" type="button">
            ${isDeleting ? `deleting...` : `delete`}
          </button>
        </div>
      </div>
    </form>
  </article>`;
};

export default class TaskEdit extends SmartView {
  private _datepicker: Iflatpickr

  constructor(task: Task = BLANK_TASK) {
    super();
    this._data = TaskEdit.parseTaskToData(task);
    this._datepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._dueDateToggleHandler = this._dueDateToggleHandler.bind(this);
    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);
    this._repeatingToggleHandler = this._repeatingToggleHandler.bind(this);
    this._repeatingChangeHandler = this._repeatingChangeHandler.bind(this);
    this._colorChangeHandler = this._colorChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement(): void {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(task: Task): void {
    this.updateData(
        TaskEdit.parseTaskToData(task)
    );
  }

  getTemplate(): string {
    return createTaskEditTemplate(this._data);
  }

  restoreHandlers(): void {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker(): void {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    if (this._data.isDueDate) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`.card__date`),
          {
            dateFormat: `j F`,
            defaultDate: this._data.dueDate,
            onChange: this._dueDateChangeHandler
          }
      );

    }
  }

  _setInnerHandlers(): void {
    this.getElement()
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._dueDateToggleHandler);
    this.getElement()
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._repeatingToggleHandler);
    this.getElement()
      .querySelector(`.card__text`)
      .addEventListener(`input`, this._descriptionInputHandler);
    this.getElement()
      .querySelector(`.card__colors-wrap`)
      .addEventListener(`change`, this._colorChangeHandler);

    if (this._data.isRepeating) {
      this.getElement()
        .querySelector(`.card__repeat-days-inner`)
        .addEventListener(`change`, this._repeatingChangeHandler);
    }
  }

  _descriptionInputHandler(evt: Event): void {
    evt.preventDefault();
    const target = <HTMLInputElement> evt.target;
    this.updateData({
      description: target.value
    }, true);
  }

  _dueDateToggleHandler(evt: Event): void {
    evt.preventDefault();
    this.updateData({
      isDueDate: !this._data.isDueDate,
      isRepeating: !this._data.isDueDate && false
    });
  }

  _repeatingToggleHandler(evt: Event): void {
    evt.preventDefault();
    this.updateData({
      isRepeating: !this._data.isRepeating,
      isDueDate: !this._data.isRepeating && false
    });
  }

  _dueDateChangeHandler([userDate]: Date[]): void {
    userDate.setHours(23, 59, 59, 999);

    this.updateData({
      dueDate: userDate
    });
  }

  _repeatingChangeHandler(evt: Event): void {
    evt.preventDefault();
    const target = <HTMLInputElement> evt.target;
    this.updateData({
      repeatingMask: updateRepeatingMask(this._data.repeatingMask, target.value)
    });
  }

  _colorChangeHandler(evt: Event): void {
    evt.preventDefault();
    const target = <HTMLInputElement> evt.target;
    this.updateData({
      color: target.value
    });
  }

  _formSubmitHandler(evt: Event): void {
    evt.preventDefault();
    this._callback.formSubmit(TaskEdit.parseDataToTask(this._data));
  }

  setFormSubmitHandler(callback: Action): void {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt: Event): void {
    evt.preventDefault();
    this._callback.deleteClick(TaskEdit.parseDataToTask(this._data));
  }

  setDeleteClickHandler(callback: Action): void {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.card__delete`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseTaskToData(task: Task): Record<string, any> {
    return Object.assign(
        {},
        task,
        {
          isDueDate: task.dueDate !== null,
          isRepeating: isTaskRepeating(task.repeatingMask),
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToTask(data: Record<string, any>): Task {
    data = Object.assign({}, data);

    if (!data.isDueDate) {
      data.dueDate = null;
    }

    if (!data.isRepeating) {
      data.repeatingMask = 0;
    }

    delete data.isDueDate;
    delete data.isRepeating;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return <Task> data;
  }
}
