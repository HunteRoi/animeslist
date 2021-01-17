import _sortBy from 'lodash/sortBy';

export const sortBy = <T, TSelected>(
  array: Array<T>,
  selector: (item: T) => TSelected
) => _sortBy(array, selector);
