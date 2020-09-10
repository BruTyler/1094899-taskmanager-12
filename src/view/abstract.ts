import {createElement} from '../utils/render';
import {Action} from '../types';

export default class AbstractView {
  protected _element: HTMLElement | null
  protected _callback: Record<string, Action>

  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate(): string {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement(): HTMLElement {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement(): void {
    this._element = null;
  }
}
