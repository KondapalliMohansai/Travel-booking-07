import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, Users } from "lucide-react";
import { packages } from "../data/packages";
import { useBookings } from "../context/BookingContext";

const today = new Date();
const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const item = packages.find(p => p.id === id);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", startDate: "", travelers: "2", notes: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const travelers = Number(form.travelers);
  const total = useMemo(() => (item?.price || 0) * travelers, [item, travelers]);

  if (!item) return <Navigate to="/destinations" replace />;

  function update(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); setErrors(prev => ({ ...prev, [e.target.name]: "" })); }

  function validate() {
    const next = {};
    if (form.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!/^[+]?[\d\s()-]{8,16}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number (at least 8 digits).";
    if (!form.startDate) next.startDate = "Choose your preferred departure date.";
    else if (form.startDate < minDate) next.startDate = "Departure date cannot be in the past.";
    if (!form.travelers || travelers < 1 || travelers > 12) next.travelers = "Choose 1–12 travelers.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    addBooking({ packageId: item.id, packageTitle: item.title, destination: item.destination, image: item.image, unitPrice: item.price, totalPrice: total, ...form, travelers });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) return <div className="container confirmation-page"><div className="confirmation-card"><span className="confirmation-icon"><CheckCircle2 size={38}/></span><div className="eyebrow">YOU'RE GOING PLACES</div><h1>Trip request saved!</h1><p>Your booking for <strong>{item.title}</strong> has been saved on this device. This demo does not process payments.</p><div className="confirmation-total"><span>Total for {travelers} {travelers === 1 ? "traveler" : "travelers"}</span><strong>${total.toLocaleString()}</strong></div><button className="button button-primary button-full" onClick={() => navigate("/bookings")}>View my bookings</button><Link className="text-link confirmation-link" to="/destinations">Explore more trips</Link></div></div>;

  return (
    <div className="container booking-page">
      <Link to={`/destinations/${item.id}`} className="back-link"><ArrowLeft size={16}/> Back to trip details</Link>
      <div className="booking-heading"><div className="eyebrow">ONE STEP CLOSER</div><h1>Let's plan your <em>getaway.</em></h1><p>Share a few details and we'll save your trip request.</p></div>
      <div className="booking-layout">
        <form className="booking-form" onSubmit={submit} noValidate>
          <div className="form-section-title"><span>01</span><div><h2>Your details</h2><p>Who should we contact about this trip?</p></div></div>
          <div className="form-grid">
            <div className="field full-field"><label htmlFor="fullName">Full name *</label><input id="fullName" name="fullName" value={form.fullName} onChange={update} placeholder="e.g. Alex Morgan" autoComplete="name"/>{errors.fullName && <small className="field-error">{errors.fullName}</small>}</div>
            <div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="alex@example.com" autoComplete="email"/>{errors.email && <small className="field-error">{errors.email}</small>}</div>
            <div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" name="phone" type="tel" value={form.phone} onChange={update} placeholder="+91 98765 43210" autoComplete="tel"/>{errors.phone && <small className="field-error">{errors.phone}</small>}</div>
          </div>
          <div className="form-section-title form-section-spaced"><span>02</span><div><h2>Your trip</h2><p>Choose a date and the size of your group.</p></div></div>
          <div className="form-grid">
            <div className="field"><label htmlFor="startDate">Departure date *</label><input id="startDate" name="startDate" type="date" min={minDate} value={form.startDate} onChange={update}/>{errors.startDate && <small className="field-error">{errors.startDate}</small>}</div>
            <div className="field"><label htmlFor="travelers">Number of travelers *</label><div className="input-with-icon"><Users size={17}/><select id="travelers" name="travelers" value={form.travelers} onChange={update}>{Array.from({length: 12}, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n === 1 ? "traveler" : "travelers"}</option>)}</select></div>{errors.travelers && <small className="field-error">{errors.travelers}</small>}</div>
            <div className="field full-field"><label htmlFor="notes">Anything else we should know? <span>(optional)</span></label><textarea id="notes" name="notes" rows="3" value={form.notes} onChange={update} placeholder="Special requests, accessibility needs, or questions..."/></div>
          </div>
          <button className="button button-primary button-full submit-booking" type="submit"><CreditCard size={17}/> Save booking request</button>
          <p className="secure-note"><ShieldCheck size={15}/> Your details stay in this demo browser. No payment is taken.</p>
        </form>
        <aside className="booking-summary"><img src={item.image} alt={item.destination}/><div className="summary-content"><span className="summary-label">YOUR SELECTED TRIP</span><h2>{item.title}</h2><p>{item.destination} · {item.days} days / {item.nights} nights</p><div className="summary-rule"/><div className="summary-line"><span>Price per traveler</span><strong>${item.price.toLocaleString()}</strong></div><div className="summary-line"><span>Travelers</span><strong>× {travelers}</strong></div><div className="summary-rule"/><div className="summary-total"><span>Estimated total</span><strong>${total.toLocaleString()}</strong></div><small className="summary-disclaimer">Final details can be confirmed with your travel provider. Demo prices are illustrative.</small></div></aside>
      </div>
    </div>
  );
}
