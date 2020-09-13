import AbstractView from './abstract';

const createNoTaskTemplate = (): string => {
  return `<p class="board__no-tasks">
    Loading...
  </p>`;
};

export default class Loading extends AbstractView {
  getTemplate(): string {
    return createNoTaskTemplate();
  }
}
