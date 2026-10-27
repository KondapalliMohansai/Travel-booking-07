import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";

export default function Destinations() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(2000);
  const categories = ["All", "Beach", "Adventure", "Culture", "Nature"];

  const filtered = useMemo(() => {
    let result = packages.filter(item =>
      `${item.title} ${item.destination} ${item.country}`.toLowerCase().includes(query.toLowerCase()) &&
      (category === "All" || item.category === category) && item.price <= maxPrice
    );
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [query, category, sort, maxPrice]);

  function clearFilters() { setQuery(""); setCategory("All"); setSort("recommended"); setMaxPrice(2000); }

  return (
    <div className="page-shell">
      <section className="page-hero destinations-hero"><div className="container page-hero-content"><div className="eyebrow eyebrow-light"><MapPin size={14}/> FIND YOUR SOMEWHERE</div><h1>The world is<br/><em>waiting for you.</em></h1><p>From slow beach days to mountain-top moments, find a trip that feels like yours.</p></div></section>
      <section className="container listing-section">
        <div className="listing-heading"><div><div className="eyebrow">THE COLLECTION</div><h2>Explore all trips<span>.</span></h2><p>{filtered.length} thoughtfully planned {filtered.length === 1 ? "journey" : "journeys"} to choose from.</p></div></div>
        <div className="filter-bar">
          <label className="search-field"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destination or trip..." aria-label="Search destinations"/></label>
          <label className="select-field"><SlidersHorizontal size={17}/><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category">{categories.map(c => <option key={c} value={c}>{c === "All" ? "All experiences" : c}</option>)}</select></label>
          <label className="select-field"><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort trips"><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label>
          <div className="budget-filter"><label htmlFor="budget">Max budget: <strong>${maxPrice.toLocaleString()}</strong></label><input id="budget" type="range" min="250" max="2000" step="50" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}/></div>
          <button className="clear-button" onClick={clearFilters}><X size={15}/> Clear</button>
        </div>
        {filtered.length ? <div className="package-grid">{filtered.map(item => <PackageCard key={item.id} item={item}/>)}</div> : <div className="empty-state"><span className="empty-icon"><Search/></span><h3>No trips found just yet</h3><p>Try a different destination or loosen your filters.</p><button className="button button-primary" onClick={clearFilters}>Clear filters</button></div>}
      </section>
    </div>
  );
}
