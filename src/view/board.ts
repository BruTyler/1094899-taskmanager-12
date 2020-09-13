import AbstractView from './abstract';

const createBoardTemplate = (): string => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractView {
  getTemplate(): string {
    return createBoardTemplate();
  }
}
