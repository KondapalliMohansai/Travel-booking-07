import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return <div className="container not-found"><span className="not-found-icon"><Compass size={34}/></span><div className="eyebrow">OFF THE MAP</div><h1>Looks like you've<br/><em>wandered off.</em></h1><p>This page doesn't exist, but your next adventure is still out there.</p><Link to="/" className="button button-primary">Back to home</Link></div>;
}
