import { Link } from "react-router-dom";
import { Compass, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand"><span className="brand-mark"><Compass size={22} /></span><span>travel<span className="brand-accent">go</span></span></Link>
          <p className="footer-copy">Thoughtfully planned escapes for curious people. Your next great story starts here.</p>
        </div>
        <div><h4>Explore</h4><Link to="/destinations">Destinations</Link><Link to="/bookings">My bookings</Link></div>
        <div><h4>Need help?</h4><a href="mailto:hello@travelgo.example"><Mail size={15} /> hello@travelgo.example</a><span className="footer-note">Support hours: Mon–Sat, 9am–6pm</span></div>
        <div><h4>Follow along</h4><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={18}/></a><a href="https://facebook.com" aria-label="Facebook"><Facebook size={18}/></a></div></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} TravelGo. Demo booking experience.</span><span>Made for your next adventure.</span></div>
    </footer>
  );
}
