import AbstractView from './abstract';
import {SortType} from '../const';
import {transformToStringId} from '../utils/common';

const createSortTemplate = () => {
  const sortItemsTemplate = Object
    .values(SortType)
    .map((sortValue) => `<a href="#" class="board__filter" data-sort-type="${transformToStringId(sortValue)}">SORT BY ${sortValue}</a>`)
    .join(`\n`);

  return `<div class="board__filter-list">
    ${sortItemsTemplate}
  </div>`;
};

export default class Sort extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}
