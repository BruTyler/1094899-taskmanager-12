import Observer from '../utils/observer';
import {FilterType, UpdateType} from '../const';

export default class Filter extends Observer {
  private _activeFilter: FilterType;

  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType: UpdateType, filter: FilterType): void {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter(): FilterType {
    return this._activeFilter;
  }
}
