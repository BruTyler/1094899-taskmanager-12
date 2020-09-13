import AbstractView from './abstract';
import {SortType} from '../const';
import {Action} from '../types';

const createSortTemplate = (currentSortType: SortType): string => {
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
  private _currentSortType: SortType

  constructor(currentSortType: SortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate(): string {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt: Event): void {
    const target = <HTMLButtonElement> evt.target;

    if (target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback: Action): void {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
