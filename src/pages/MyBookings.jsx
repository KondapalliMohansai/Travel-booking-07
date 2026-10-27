import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Trash2, Users, BriefcaseBusiness } from "lucide-react";
import { useBookings } from "../context/BookingContext";

export default function MyBookings() {
  const { bookings, cancelBooking } = useBookings();
  return (
    <div className="page-shell bookings-page">
      <section className="page-hero bookings-hero"><div className="container page-hero-content"><div className="eyebrow eyebrow-light"><BriefcaseBusiness size={14}/> YOUR TRAVEL JOURNAL</div><h1>Your trips,<br/><em>all in one place.</em></h1><p>Every plan starts somewhere. Here's where yours are saved.</p></div></section>
      <section className="container saved-bookings">
        <div className="saved-heading"><div><div className="eyebrow">YOUR BOOKINGS</div><h2>My travel plans<span>.</span></h2><p>{bookings.length} {bookings.length === 1 ? "booking" : "bookings"} saved in this browser.</p></div><Link to="/destinations" className="button button-primary">Find another trip</Link></div>
        {bookings.length === 0 ? <div className="empty-state"><span className="empty-icon"><BriefcaseBusiness/></span><h3>Your next adventure starts here</h3><p>You haven't saved any bookings yet. Browse our trips and find one that feels right.</p><Link to="/destinations" className="button button-primary">Explore destinations</Link></div> :
          <div className="saved-list">{bookings.map(booking => <article className="saved-card" key={booking.id}><img src={booking.image} alt={booking.destination}/><div className="saved-card-info"><span className="booking-id">{booking.id}</span><h3>{booking.packageTitle}</h3><p className="saved-location"><MapPin size={14}/>{booking.destination}</p><div className="saved-meta"><span><CalendarDays size={15}/>{booking.startDate}</span><span><Users size={15}/>{booking.travelers} {booking.travelers === 1 ? "traveler" : "travelers"}</span></div><small>Booked for {booking.fullName} · {booking.email}</small></div><div className="saved-price"><span>Total estimate</span><strong>${Number(booking.totalPrice).toLocaleString()}</strong><button className="cancel-button" onClick={() => { if (window.confirm("Remove this saved booking?")) cancelBooking(booking.id); }}><Trash2 size={14}/> Remove</button></div></article>)}</div>}
        <p className="storage-note">Bookings are stored in this browser using localStorage. Clearing browser data will remove them.</p>
      </section>
    </div>
  );
}
