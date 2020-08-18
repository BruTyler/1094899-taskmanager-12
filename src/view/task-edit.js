import AbstractView from './abstract';
import {Color} from '../const';
import {isTaskExpired, humanizeTaskDueDate} from '../utils/task';
import {getRepeatingDayNames, isTaskRepeating, isDayRepeating} from '../utils/bitmap';

const BLANK_TASK = {
  color: Color.BLACK,
  description: ``,
  dueDate: null,
  repeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  },
  repeatingDaysMask: 0,
  isArchive: false,
  isFavorite: false
};

const createTaskEditDateTemplate = (dueDate) => {
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
    </button>
    ${dueDate !== null ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${humanizeTaskDueDate(dueDate)}"
        />
      </label>
    </fieldset>` : ``}
  `;
};

const createTaskEditRepeatingTemplate = (repeatingMask) => {
  const repeatingDayNames = getRepeatingDayNames();

  return `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${isTaskRepeating(repeatingMask) ? `yes` : `no`}</span>
  </button>
  ${isTaskRepeating(repeatingMask)
    ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${repeatingDayNames.map((day) =>`<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}"
            name="repeat"
            value="${day}"
            ${isDayRepeating(repeatingMask, day) ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}"
            >${day}</label
          >`).join(``)}
        </div>
      </fieldset>`
    : ``}`;
};

const createTaskEditColorsTemplate = (currentColor) => {
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

const createTaskEditTemplate = (task) => {
  const {color, description, dueDate, repeatingMask} = task;

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;
  const dateTemplate = createTaskEditDateTemplate(dueDate);

  const repeatingClassName = isTaskRepeating(repeatingMask)
    ? `card--repeat`
    : ``;
  const repeatingTemplate = createTaskEditRepeatingTemplate(repeatingMask);

  const colorsTemplate = createTaskEditColorsTemplate(color);

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
            >${description}</textarea>
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
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};

export default class TaskEdit extends AbstractView {
  constructor(task = BLANK_TASK) {
    super();
    this._task = task;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
