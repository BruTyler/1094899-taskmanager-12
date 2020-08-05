import {createBoardTemplate} from '../view/board.js';

it(`Board rendering`, () => {
  const generatedBoard = createBoardTemplate();

  expect(generatedBoard).toMatchSnapshot();
});
