import { initializeTimes, updateTimes } from '../utils';
import { fetchAPI } from '../api';

test('initializeTimes returns a non-empty array of times', () => {
  const times = initializeTimes();
  expect(Array.isArray(times)).toBe(true);
  expect(times.length).toBeGreaterThan(0);
});

test('updateTimes returns times for the chosen date', () => {
  const result = updateTimes([], { type: 'DATE_CHANGED', date: '2030-05-20' });
  expect(result).toEqual(fetchAPI(new Date('2030-05-20')));
});

test('updateTimes returns existing state for unknown action', () => {
  expect(updateTimes(['17:00'], { type: 'X' })).toEqual(['17:00']);
});

test('fetchAPI handles an invalid date', () => {
  expect(fetchAPI('not-a-date')).toEqual([]);
});
