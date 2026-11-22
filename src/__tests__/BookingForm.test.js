import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm, { validate } from '../components/BookingForm';

const setup = (props = {}) =>
  render(<BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} submitForm={jest.fn()} {...props} />);

test('renders all labelled fields', () => {
  setup();
  ['Date', 'Time', 'Number of guests', 'Occasion'].forEach((l) =>
    expect(screen.getByLabelText(l)).toBeInTheDocument());
});

test('renders the available times as options', () => {
  setup();
  expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
});

test('submit button is disabled while form is invalid', () => {
  setup();
  expect(screen.getByRole('button', { name: /reserve table/i })).toBeDisabled();
});

test('shows an error for guests out of range', async () => {
  setup();
  const guests = screen.getByLabelText('Number of guests');
  await userEvent.clear(guests);
  await userEvent.type(guests, '15');
  await userEvent.tab();
  expect(screen.getByRole('alert')).toHaveTextContent(/1 to 10/);
});

test('submits valid data', async () => {
  const submitForm = jest.fn();
  setup({ submitForm });
  const future = new Date(Date.now() + 864e5 * 2).toISOString().split('T')[0];
  await userEvent.type(screen.getByLabelText('Date'), future);
  await userEvent.selectOptions(screen.getByLabelText('Time'), '17:00');
  await userEvent.click(screen.getByRole('button', { name: /reserve table/i }));
  expect(submitForm).toHaveBeenCalledTimes(1);
});

test('validate rejects past dates and blank fields', () => {
  const e = validate({ date: '2000-01-01', time: '', guests: 0, occasion: '' });
  expect(Object.keys(e)).toEqual(['date', 'time', 'guests', 'occasion']);
});
