import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Compass, BriefcaseBusiness } from "lucide-react";
import { useBookings } from "../context/BookingContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { bookings } = useBookings();
  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/destinations", label: "Destinations" },
    { to: "/bookings", label: "My Bookings" }
  ];
  return (
    <header className="site-header">
      <nav className="nav container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Compass size={22} /></span>
          <span>travel<span className="brand-accent">go</span></span>
        </Link>
        <button className="mobile-menu icon-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map(link => <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)}>{link.label}{link.to === "/bookings" && bookings.length > 0 && <span className="nav-count">{bookings.length}</span>}</NavLink>)}
          <Link className="button button-primary nav-cta" to="/destinations" onClick={() => setOpen(false)}><BriefcaseBusiness size={16} /> Plan a trip</Link>
        </div>
      </nav>
    </header>
  );
}
