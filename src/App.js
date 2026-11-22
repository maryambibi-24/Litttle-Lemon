import { Link, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components/Layout';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';

const Home = () => (
  <section className="hero">
    <div className="container">
      <h1>Little Lemon</h1>
      <h2>Chicago</h2>
      <p>Family-owned Mediterranean restaurant, with a modern twist on classic recipes.</p>
      <Link to="/booking" className="btn">Reserve a table</Link>
    </div>
  </section>
);

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
          <Route path="*" element={<section className="container"><h1>Page not found</h1><Link to="/">Go home</Link></section>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
