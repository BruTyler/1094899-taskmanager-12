import {createElement} from '../utils/render';
import {Action} from '../types';

const SHAKE_ANIMATION_TIMEOUT = 600;

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

  shake(callback: Action): void {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
