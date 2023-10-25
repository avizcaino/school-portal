import {DBFilterOperator} from '../src/domain/db';

export function applyFilter(item, filter) {
  const {field, operator, value} = filter;

  if (operator === DBFilterOperator.equals) {
    return item[field] === value;
  } else if (operator === DBFilterOperator.contains) {
    return item[field].indexOf(value) > -1;
  } else if (operator === 'greater_than') {
    return item[field] > value;
  }
  // Add more conditions for other operators (e.g., 'less_than', 'contains', etc.)
  return true; // Default to true if the operator is not recognized
}
