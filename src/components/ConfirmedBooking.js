import { Link, useLocation } from 'react-router-dom';

export default function ConfirmedBooking() {
  const { state } = useLocation();
  // Edge case: page opened directly with no booking data.
  if (!state) {
    return (
      <section className="container">
        <h1>No booking found</h1>
        <p><Link to="/booking">Reserve a table</Link></p>
      </section>
    );
  }
  return (
    <section className="container" aria-live="polite">
      <h1>Booking confirmed</h1>
      <p>See you on {state.date} at {state.time} for {state.guests} guest(s). Occasion: {state.occasion}.</p>
      <Link to="/" className="btn">Back to home</Link>
    </section>
  );
}
