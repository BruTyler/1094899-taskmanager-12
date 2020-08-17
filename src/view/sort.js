import AbstractView from './abstract';
import {SortType} from '../const';

const createSortTemplate = () => {
  const sortItemsTemplate = Object
    .values(SortType)
    .map((sortValue) => `<a href="#" class="board__filter" data-sort-type="${sortValue}">SORT BY ${sortValue}</a>`)
    .join(`\n`);

  return `<div class="board__filter-list">
    ${sortItemsTemplate}
  </div>`;
};

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
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
