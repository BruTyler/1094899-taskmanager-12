import {isTaskRepeating, humanizeTaskDueDate, isTaskExpired, createElement} from '../utils';

const createTaskTemplate = (task) => {
  const {description, dueDate, repeatingDays, color, isFavorite, isArchive} = task;

  const repeatClass = isTaskRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  const deadlineClass = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const archiveClass = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  const favoriteClass = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  const deadlineElement = dueDate !== null
    ? `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${humanizeTaskDueDate(dueDate)}</span>
          </p>
        </div>
      </div>`
    : ``;

  return (
    `<article class="card card--${color} ${deadlineClass}  ${repeatClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn ${archiveClass}">
              archive
            </button>
            <button
              type="button"
              class="card__btn ${favoriteClass}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${deadlineElement}
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
