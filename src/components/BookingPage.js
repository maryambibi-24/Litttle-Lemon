import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from '../utils';
import { submitAPI } from '../api';

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const submitForm = (data) => {
    if (submitAPI(data)) navigate('/confirmed', { state: data });
    else setFailed(true); // edge case: API rejected the booking
  };

  return (
    <section className="container" aria-labelledby="book-title">
      <h1 id="book-title">Reserve a table</h1>
      {failed && <p className="error" role="alert">We could not save your booking. Please try again.</p>}
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
    </section>
  );
}
