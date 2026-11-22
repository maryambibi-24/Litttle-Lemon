# Little Lemon – Table Booking

React web app for the Little Lemon restaurant: home page, table reservation form with validation, and a confirmation page.

## Features
- Booking form: date, time, guests (1–10), occasion
- Validation with accessible, meaningful error messages (past dates, empty fields, out-of-range guests)
- Available times update when the date changes (`useReducer` + mock API in `src/api.js`)
- Accessibility: semantic landmarks (`header`, `nav`, `main`, `footer`), labels, `aria-invalid`, `aria-describedby`, `role="alert"`, skip link, visible focus
- Responsive layout (mobile first breakpoints in `src/App.css`)
- Edge cases: invalid date, API failure, opening `/confirmed` directly, unknown routes

## Setup
Requires Node.js 18+.
```bash
npm install
npm start      # http://localhost:3000
npm test       # run unit tests (Jest + React Testing Library)
npm run build  # production build
```

## Structure
```
src/
  api.js                 mock fetchAPI / submitAPI
  utils.js               initializeTimes, updateTimes (reducer)
  App.js, App.css        routes and styles
  components/            BookingForm, BookingPage, ConfirmedBooking, Layout
  __tests__/             unit tests
```

## Design
Brand colours: green `#495E57`, yellow `#F4CE14`, salmon `#EE9972`. Fonts: Markazi Text and Karla. Adjust `App.css` to match your Figma design exactly.

## Git
Commit history follows small, descriptive commits (`git log --oneline`).
