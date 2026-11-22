import { useState } from 'react';
import { todayISO } from '../utils';

const OCCASIONS = ['Birthday', 'Anniversary', 'Other'];

// Returns an object of error messages (empty object = valid).
export const validate = ({ date, time, guests, occasion }) => {
  const errors = {};
  if (!date) errors.date = 'Please choose a date.';
  else if (date < todayISO()) errors.date = 'Date cannot be in the past.';
  if (!time) errors.time = 'Please choose a time.';
  const n = Number(guests);
  if (!guests) errors.guests = 'Please enter the number of guests.';
  else if (!Number.isInteger(n) || n < 1 || n > 10) errors.guests = 'Guests must be a whole number from 1 to 10.';
  if (!occasion) errors.occasion = 'Please select an occasion.';
  return errors;
};

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [values, setValues] = useState({ date: '', time: '', guests: 1, occasion: 'Birthday' });
  const [touched, setTouched] = useState({});
  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const change = (e) => {
    const { id, value } = e.target;
    setValues((v) => ({ ...v, [id]: value }));
    // Changing the date reloads the available times and clears old selection.
    if (id === 'date') {
      dispatch({ type: 'DATE_CHANGED', date: value });
      setValues((v) => ({ ...v, date: value, time: '' }));
    }
  };
  const blur = (e) => setTouched((t) => ({ ...t, [e.target.id]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ date: true, time: true, guests: true, occasion: true });
    if (isValid) submitForm(values);
  };

  // Helper to render a field's error message and aria wiring.
  const err = (id) => touched[id] && errors[id];
  const aria = (id) => ({
    'aria-invalid': err(id) ? 'true' : 'false',
    'aria-describedby': err(id) ? `${id}-error` : undefined,
  });
  const Error = ({ id }) =>
    err(id) ? <p className="error" id={`${id}-error`} role="alert">{errors[id]}</p> : null;

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate aria-label="Table reservation form">
      <label htmlFor="date">Date</label>
      <input id="date" type="date" min={todayISO()} required value={values.date}
        onChange={change} onBlur={blur} {...aria('date')} />
      <Error id="date" />

      <label htmlFor="time">Time</label>
      <select id="time" required value={values.time} onChange={change} onBlur={blur} {...aria('time')}>
        <option value="">Select a time</option>
        {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      <Error id="time" />

      <label htmlFor="guests">Number of guests</label>
      <input id="guests" type="number" min="1" max="10" required value={values.guests}
        onChange={change} onBlur={blur} {...aria('guests')} />
      <Error id="guests" />

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" required value={values.occasion} onChange={change} onBlur={blur} {...aria('occasion')}>
        {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
      </select>
      <Error id="occasion" />

      <button type="submit" className="btn" disabled={!isValid} aria-label="Reserve table">
        Reserve table
      </button>
    </form>
  );
}
