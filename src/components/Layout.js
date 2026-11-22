import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header className="site-header">
    <span className="logo">Little Lemon</span>
    <nav aria-label="Main navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/booking">Reservations</NavLink>
    </nav>
  </header>
);

export const Footer = () => (
  <footer className="site-footer">
    <p>Little Lemon · 123 Lemon Street, Chicago</p>
  </footer>
);
