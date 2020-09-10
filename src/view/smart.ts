import AbstractView from './abstract';
import {extend} from '../utils/common';

export default class Smart extends AbstractView {
  protected _data: Record<string, any>

  constructor() {
    super();
    this._data = {};
  }

  updateData(update: Record<string, unknown>, justDataUpdating?: boolean): void {
    this._data = extend(this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement(): void {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  restoreHandlers(): void {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
