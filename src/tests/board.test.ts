import {createBoardTemplate} from '../view/board';

it(`Board rendering`, () => {
  const generatedBoard = createBoardTemplate();

  expect(generatedBoard).toMatchSnapshot();
});
