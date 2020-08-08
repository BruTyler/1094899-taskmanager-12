import {createFilterTemplate} from '../view/filter';

it(`Task rendering`, () => {
  const filterItems = [
    {title: `all`, count: 1},
    {title: `archive`, count: 2}
  ];

  const generatedBoard = createFilterTemplate(filterItems);

  expect(generatedBoard).toMatchSnapshot();
});
