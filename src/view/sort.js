import AbstractView from './abstract';
import {SortType} from '../const';

const createSortTemplate = (currentSortType) => {
  const sortItemsTemplate = Object
    .values(SortType)
    .map((sortValue) =>
      `<a href="#" 
        class="board__filter ${currentSortType === sortValue ? `board__filter--active` : ``}" 
        data-sort-type="${sortValue}"
      >
        SORT BY ${sortValue}
      </a>`)
    .join(`\n`);

  return `<div class="board__filter-list">
    ${sortItemsTemplate}
  </div>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
