import AbstractView from './abstract';
import {Action} from '../types';

const createLoadMoreButtonTemplate = (): string => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate(): string {
    return createLoadMoreButtonTemplate();
  }

  _clickHandler(evt: Event): void {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback: Action): void {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
