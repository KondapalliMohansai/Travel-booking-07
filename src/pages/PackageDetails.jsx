import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, MapPin, Star, Users, ChevronDown, ChevronUp } from "lucide-react";
import { packages } from "../data/packages";

export default function PackageDetails() {
  const { id } = useParams();
  const item = packages.find(p => p.id === id);
  const [openDay, setOpenDay] = useState(0);
  if (!item) return <Navigate to="/destinations" replace />;

  return (
    <div className="container details-page">
      <Link to="/destinations" className="back-link"><ArrowLeft size={16}/> All destinations</Link>
      <div className="details-cover"><img src={item.image} alt={item.destination}/><span className="image-tag">{item.tag}</span><div className="cover-caption"><span><MapPin size={15}/>{item.destination}</span><span><Star size={15} fill="currentColor"/>{item.rating} ({item.reviews} reviews)</span></div></div>
      <div className="details-layout">
        <article className="details-main">
          <div className="eyebrow">{item.category.toUpperCase()} COLLECTION</div>
          <h1>{item.title}</h1>
          <p className="details-description">{item.description}</p>
          <div className="quick-facts"><span><Clock3/>{item.days} days, {item.nights} nights</span><span><Users/> Small-group friendly</span><span><CalendarDays/> Flexible dates</span></div>
          <div className="details-divider"/>
          <h2>The highlights</h2><p className="muted">The little moments that make this trip special.</p>
          <div className="highlight-grid">{item.highlights.map(text => <div key={text}><span className="check-circle"><Check size={15}/></span>{text}</div>)}</div>
          <div className="details-divider"/>
          <h2>Your journey, day by day</h2><p className="muted">A thoughtful plan, with space to make it your own.</p>
          <div className="itinerary">{item.itinerary.map((day, index) => <div className={`itinerary-item ${openDay === index ? "itinerary-open" : ""}`} key={day}><button onClick={() => setOpenDay(openDay === index ? -1 : index)}><span className="day-number">0{index + 1}</span><strong>Day {index + 1}</strong><span className="itinerary-summary">{day}</span>{openDay === index ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</button>{openDay === index && <p>{day} Our local team can help tailor this experience to your pace and interests.</p>}</div>)}</div>
        </article>
        <aside className="booking-sidebar"><div className="sidebar-top"><span>Starting from</span><div className="sidebar-price">${item.price.toLocaleString()}<small> / person</small></div><div className="sidebar-rating"><Star size={15} fill="currentColor"/>{item.rating} <span>({item.reviews} traveler reviews)</span></div></div><div className="sidebar-includes"><strong>Your trip includes</strong><span><Check/> Accommodation as listed</span><span><Check/> Guided experiences</span><span><Check/> Local travel support</span></div><Link to={`/book/${item.id}`} className="button button-primary button-full">Book this trip <ArrowRight size={17}/></Link><p className="sidebar-note">No payment is collected in this demo.</p></aside>
      </div>
    </div>
  );
}
