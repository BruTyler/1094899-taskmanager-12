import AbstractView from './abstract';
import {MenuItem} from '../const';
import {Action} from '../types';

const createSiteMenuTemplate = (): string => {
  return (
    `<section class="control__btn-wrap">
      <input
        type="radio"
        name="control"
        id="control__new-task"
        class="control__input visually-hidden"
        value="${MenuItem.ADD_NEW_TASK}"
      />
      <label for="control__new-task" class="control__label control__label--new-task"
        >+ ADD NEW TASK</label
      >
      <input
        type="radio"
        name="control"
        id="control__task"
        class="control__input visually-hidden"
        value="${MenuItem.TASKS}"
        checked
      />
      <label for="control__task" class="control__label">TASKS</label>
      <input
        type="radio"
        name="control"
        id="control__statistic"
        class="control__input visually-hidden"
        value="${MenuItem.STATISTICS}"
      />
      <label for="control__statistic" class="control__label"
        >STATISTICS</label
      >
    </section>`
  );
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate(): string {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt: Event): void {
    evt.preventDefault();
    const target = <HTMLInputElement> evt.target;
    this._callback.menuClick(target.value);
  }

  setMenuClickHandler(callback: Action): void {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`change`, this._menuClickHandler);
  }

  setMenuItem(menuItem: MenuItem): void {
    const item = <HTMLInputElement> this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}
