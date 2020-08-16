import BoardPresenter from '../presenter/board';
import {Color} from '../const';
import {createElement} from '../utils/render';

it(`Board-Presenter rendering`, () => {
  const task = {
    description: `some description`,
    dueDate: new Date(2020, 8, 4),
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    },
    color: Color.BLACK,
    isFavorite: true,
    isArchive: false,
  };

  const tasks = new Array(10).fill(task);
  const containerElement = createElement(`<div id="container-template"></div>`);

  const boardPresenter = new BoardPresenter(containerElement);
  boardPresenter.init(tasks);

  expect(containerElement).toMatchSnapshot();
});
