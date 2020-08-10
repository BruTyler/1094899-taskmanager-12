import FilterView from '../view/filter.js';

it(`Filter rendering`, () => {
  const filterItems = [
    {title: `all`, count: 1},
    {title: `archive`, count: 2}
  ];

  const generatedTree = new FilterView(filterItems).getTemplate();

  expect(generatedTree).toMatchSnapshot();
});
