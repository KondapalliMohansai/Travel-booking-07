import { ArrowUpRight, Clock3, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function PackageCard({ item }) {
  return (
    <article className="package-card">
      <Link to={`/destinations/${item.id}`} className="card-image-wrap" aria-label={`View ${item.title}`}>
        <img className="card-image" src={item.image} alt={item.destination} loading="lazy" />
        <span className="image-tag">{item.tag}</span>
        <span className="image-arrow"><ArrowUpRight size={18}/></span>
      </Link>
      <div className="package-card-body">
        <div className="card-location"><MapPin size={14}/>{item.destination}</div>
        <Link to={`/destinations/${item.id}`} className="card-title">{item.title}</Link>
        <div className="card-meta"><span><Clock3 size={15}/>{item.days} days / {item.nights} nights</span><span className="rating"><Star size={14} fill="currentColor"/>{item.rating} <small>({item.reviews})</small></span></div>
        <div className="card-bottom"><div><small>Starting from</small><strong>${item.price.toLocaleString()} <small>/ person</small></strong></div><Link to={`/destinations/${item.id}`} className="text-link">View trip <ArrowUpRight size={15}/></Link></div>
      </div>
    </article>
  );
}
