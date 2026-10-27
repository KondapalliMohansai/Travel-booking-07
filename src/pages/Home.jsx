import { ArrowRight, ArrowUpRight, CheckCircle2, Globe2, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";

export default function Home() {
  const featured = packages.slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="eyebrow eyebrow-light"><Sparkles size={14}/> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>Go beyond<br/><em>the ordinary.</em></h1>
          <p>Meaningful journeys, memorable places, and the freedom to travel your way.</p>
          <div className="hero-actions"><Link to="/destinations" className="button button-primary button-large">Explore destinations <ArrowRight size={18}/></Link><a href="#featured" className="hero-secondary">Discover our trips <ArrowUpRight size={17}/></a></div>
          <div className="hero-trust"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><strong>Loved by 12,000+ travelers</strong><small>Real adventures, real memories</small></div></div>
        </div>
        <div className="hero-bottom container"><span><Globe2 size={16}/> 30+ countries to explore</span><span>Travel thoughtfully. Travel freely.</span></div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><ShieldCheck/><span><strong>Travel with confidence</strong><small>Carefully selected stays & guides</small></span></div>
          <div><CheckCircle2/><span><strong>Thoughtful itineraries</strong><small>Every detail, considered</small></span></div>
          <div><Headphones/><span><strong>Here when you need us</strong><small>Friendly support along the way</small></span></div>
        </div>
      </section>

      <section className="section container" id="featured">
        <div className="section-heading"><div><div className="eyebrow">CURATED FOR YOU</div><h2>Trips worth talking about<span>.</span></h2><p>Handpicked escapes for your next unforgettable story.</p></div><Link className="text-link desktop-link" to="/destinations">View all trips <ArrowRight size={16}/></Link></div>
        <div className="package-grid">{featured.map(item => <PackageCard key={item.id} item={item}/>)}</div>
        <div className="mobile-center"><Link className="button button-outline" to="/destinations">Explore all trips <ArrowRight size={16}/></Link></div>
      </section>

      <section className="inspiration-section">
        <div className="container inspiration-grid">
          <div className="inspiration-image"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85" alt="A peaceful lake surrounded by mountains" loading="lazy"/><div className="floating-note"><span className="note-icon"><Sparkles size={18}/></span><span><strong>Small details. Big memories.</strong><small>Travel that feels like you.</small></span></div></div>
          <div className="inspiration-copy"><div className="eyebrow">A BETTER WAY TO GET AWAY</div><h2>Less planning stress.<br/><em>More living in the moment.</em></h2><p>We bring the best parts of travel together: inspiring places, considered itineraries, and room to make each journey your own.</p><ul><li><CheckCircle2/> Handpicked destinations and stays</li><li><CheckCircle2/> Flexible days with local experiences</li><li><CheckCircle2/> Clear pricing, no hidden surprises</li></ul><Link to="/destinations" className="button button-primary">Find your escape <ArrowRight size={17}/></Link></div>
        </div>
      </section>

      <section className="newsletter container"><div><div className="eyebrow eyebrow-light">A LITTLE INSPIRATION, DELIVERED</div><h2>Your next adventure<br/>is calling.</h2><p>Explore somewhere new. Make room for wonder.</p></div><Link to="/destinations" className="button button-white">Find my next trip <ArrowRight size={17}/></Link></section>
    </>
  );
}
