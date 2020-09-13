import AbstractView from './abstract';
import {Filter as IFilter, Action} from '../types';
import {FilterType} from '../const';

const createFilterItemTemplate = (filter: IFilter, currentFilterType: FilterType): string => {
  const {type, title, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${type === currentFilterType ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
      value="${type}"
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >`
  );
};

const createFilterTemplate = (filterItems: IFilter[], currentFilterType: FilterType): string => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<section class="main__filter filter container">
    ${filterItemsTemplate}
  </section>`;
};

export default class Filter extends AbstractView {
  private _filters: IFilter[]
  private _currentFilter: FilterType

  constructor(filters: IFilter[], currentFilterType: FilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate(): string {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt: Event): void {
    evt.preventDefault();
    const target = <HTMLInputElement> evt.target;
    this._callback.filterTypeChange(target.value);
  }

  setFilterTypeChangeHandler(callback: Action): void {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
