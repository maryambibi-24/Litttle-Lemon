import { fetchAPI } from './api';

export const todayISO = () => new Date().toISOString().split('T')[0];

// Initial available times: slots for today.
export const initializeTimes = () => fetchAPI(new Date());

// Reducer: when the selected date changes, load that date's available times.
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'DATE_CHANGED': return fetchAPI(new Date(action.date));
    default: return state;
  }
};
