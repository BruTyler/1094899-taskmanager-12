import FilterView from '../../view/filter';
import {FilterType} from '../../const';

it(`Filter rendering`, () => {
  const filterItems = [
    {type: `ALL`, title: `all`, count: 1},
    {type: `ARCHIVE`, title: `archive`, count: 2}
  ];
  const currentFilterType = FilterType.ALL;
  const generatedTree = new FilterView(filterItems, currentFilterType).getTemplate();

  expect(generatedTree).toMatchSnapshot();
});
